"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
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

    // Shared with the selected-work CSS modules via the --sw-short-viewport theme token.
    const shortViewport = getComputedStyle(document.documentElement)
      .getPropertyValue("--sw-short-viewport")
      .trim();
    const SHORT_VIEWPORT = `(max-height: ${shortViewport})`;

    const onWheel = (e: WheelEvent) => {
      if (window.matchMedia(SHORT_VIEWPORT).matches) return;
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
    <SelectedWorkScrollContext.Provider value={{ isPaused, setIsPaused }}>
      {children(trackRef)}
    </SelectedWorkScrollContext.Provider>
  );
};
