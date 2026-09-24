"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  useMemo,
} from "react";

type SelectedWorkScrollValue = {
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
};

const SelectedWorkScrollContext = createContext<SelectedWorkScrollValue | null>(null);

export const useSelectedWorkScroll = () => {
  const ctx = useContext(SelectedWorkScrollContext);
  if (!ctx) {
    throw new Error("useSelectedWorkScroll must be used within <SelectedWorkScrollProvider>");
  }
  return ctx;
};

type SelectedWorkScrollProviderProps = {
  children: (trackRef: RefObject<HTMLDivElement | null>) => ReactNode;
};

export const SelectedWorkScrollProvider = ({ children }: SelectedWorkScrollProviderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-root]");
    const track = trackRef.current;
    if (!section || !track) return;

    if (isPaused) return; // let the lightbox be

    // Touch devices scroll the track natively.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const onWheel = (e: WheelEvent) => {
      if (!finePointer.matches) return;
      // If the page overflows vertically, keep regular vertical scrolling.
      if (document.body.scrollHeight > window.innerHeight) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;

      // Trackpads already send horizontal deltas; take the larger intent.
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      e.preventDefault();
      track.scrollLeft = Math.max(0, Math.min(max, track.scrollLeft + delta));
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [isPaused]);

  return (
    <SelectedWorkScrollContext.Provider
      value={useMemo(() => ({ isPaused, setIsPaused }), [isPaused])}
    >
      {children(trackRef)}
    </SelectedWorkScrollContext.Provider>
  );
};
