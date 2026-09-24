"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button } from "@/components/Button";

type SelectedWorkNavProps = {
  trackRef: RefObject<HTMLDivElement | null>;
};

// Sub-pixel slack so a card that's flush with the edge counts as "at" it.
const EPSILON = 2;

export const SelectedWorkNav = ({ trackRef }: SelectedWorkNavProps) => {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Where an in-flight smooth scroll is headed, so rapid clicks chain from
  // there instead of re-targeting the edge that scroll is already going to.
  const pendingRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setCanPrev(track.scrollLeft > EPSILON);
      setCanNext(track.scrollLeft < max - EPSILON);
      if (pendingRef.current !== null && Math.abs(track.scrollLeft - pendingRef.current) <= EPSILON)
        pendingRef.current = null;
    };

    // Settled, or the user took over with wheel/touch: step from where it is.
    const clearPending = () => {
      pendingRef.current = null;
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("scrollend", clearPending);
    track.addEventListener("wheel", clearPending, { passive: true });
    track.addEventListener("touchstart", clearPending, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      track.removeEventListener("scrollend", clearPending);
      track.removeEventListener("wheel", clearPending);
      track.removeEventListener("touchstart", clearPending);
      observer.disconnect();
    };
  }, [trackRef]);

  // Step to the next card edge past the current (or pending) scroll position,
  // so uneven card widths and partially scrolled states still land flush.
  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const from = pendingRef.current ?? track.scrollLeft;
    const origin = track.getBoundingClientRect().left - track.scrollLeft;
    const edges = Array.from(track.children, (el) => el.getBoundingClientRect().left - origin);
    const edge =
      direction === 1
        ? edges.find((x) => x > from + EPSILON)
        : edges.findLast((x) => x < from - EPSILON);
    // Clamp so the pending target is a position the track can actually reach.
    const target = Math.max(0, Math.min(max, edge ?? (direction === 1 ? max : 0)));

    pendingRef.current = target;
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <div className="flex gap-2">
      <Button
        hasIconOnly
        variant="outline"
        size="sm"
        aria-label="Previous project"
        disabled={!canPrev}
        onClick={() => step(-1)}
        className="disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowLeft size={18} aria-hidden />
      </Button>
      <Button
        hasIconOnly
        variant="outline"
        size="sm"
        aria-label="Next project"
        disabled={!canNext}
        onClick={() => step(1)}
        className="disabled:pointer-events-none disabled:opacity-30"
      >
        <ArrowRight size={18} aria-hidden />
      </Button>
    </div>
  );
};
