"use client";

import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { GRAYSCALE_CLASS } from "./SelectedWorkThumbnail";
import { cn } from "cn";

/**
 * Move a node between parents without disconnecting it. `appendChild` is a
 * remove followed by an insert, and removing a media element from the document
 * queues the spec's "pause the element" steps; `moveBefore` is atomic, so the
 * element never leaves the tree and its playback state can't be touched. It
 * throws when the move can't be atomic (detached node, different document),
 * hence the fallback.
 */
const moveInto = (target: HTMLElement, el: HTMLElement) => {
  if (typeof target.moveBefore === "function" && el.isConnected) {
    try {
      target.moveBefore(el, null);
      return;
    } catch {
      // Falls through to the non-atomic path.
    }
  }
  target.appendChild(el);
};

/**
 * The link between a thumbnail's `<video>` and the lightbox slot it is lent
 * to. Held by whoever renders both; it carries no state of its own, so that
 * the video's behaviour can live with the element itself.
 */
type HoistedVideoSlot = {
  video: HTMLVideoElement | null;
  home: HTMLElement | null;
  /** The lightbox's slot, while it is mounted. */
  stage: HTMLElement | null;
};

export const useHoistedVideoSlotRef = () =>
  useRef<HoistedVideoSlot>({ video: null, home: null, stage: null });

/**
 * Hand the video to the lightbox: full size, audible, and the visitor's to
 * drive. Neither this nor `reclaim` touches playback, so that repeating
 * either one is harmless — React re-attaches refs on a StrictMode remount,
 * and a pause in here would land after the effect that starts playing.
 */
const lend = (stage: HTMLElement, video: HTMLVideoElement) => {
  if (video.parentElement !== stage) moveInto(stage, video);
  video.controls = true;
  video.muted = false;
  video.volume = 0;
  video.loop = false;
};

/** Take it back: a silent looping preview in the thumbnail again. */
const reclaim = (home: HTMLElement, video: HTMLVideoElement) => {
  if (video.parentElement !== home) moveInto(home, video);
  video.controls = false;
  video.muted = true;
  video.loop = true;
};

type UseHoistedVideoOptions = {
  slotRef: RefObject<HoistedVideoSlot>;
  videoUrl: string;
  isOpen: boolean;
  isHovered: boolean;
};

const useHoistedVideo = ({ slotRef, videoUrl, isOpen, isHovered }: UseHoistedVideoOptions) => {
  // The first frame is decoded. Until then the container's flat background
  // stands in: no still image, so there is no second colour pipeline to
  // mismatch against when the video paints.
  const [hasFrame, setHasFrame] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Warm DNS + TLS to the asset host while the document is still parsing, so
  // the <video> below is not paying for the connection on its first byte.
  preconnect(new URL(videoUrl).origin);

  // Closing takes the video back at once, while the lightbox is still
  // animating out: the thumbnail is the half that shrinks into place, so it
  // needs the video in it already. Lending on a fresh open belongs to
  // `HoistedVideoTarget`, whose slot doesn't exist yet when this runs. But
  // reopening before the close has finished revives the exiting lightbox
  // rather than remounting it, so its slot is still here and its ref won't
  // fire again: lend it from here instead.
  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isOpen) {
      if (slotRef.current.stage) lend(slotRef.current.stage, el);
    } else if (slotRef.current.home) {
      reclaim(slotRef.current.home, el);
    }
  }, [isOpen, slotRef]);

  // `loadeddata` can fire before hydration attaches the handler — media events
  // don't bubble, so React binds them to the element itself rather than the
  // root — which would leave the video stuck at opacity 0.
  useLayoutEffect(() => {
    const el = videoRef.current;
    if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setHasFrame(true);
  }, []);

  // While the lightbox is closed the thumbnail previews on hover. This also
  // covers closing: the backdrop takes the pointer as it opens, so by the time
  // the lightbox shuts the thumbnail is usually no longer hovered.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || isOpen) return;
    if (isHovered) el.play().catch(() => {});
    else el.pause();
  }, [isHovered, isOpen]);

  // Opening carries on from wherever the hover preview got to. Keyed on the
  // open state alone, so paging back to this item inside an open lightbox
  // can't restart it behind the visitor's back.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !isOpen) return;
    el.play().catch(() => {});
  }, [isOpen]);

  return {
    // The media fragment makes the browser seek on load and decode a frame up
    // front; without it a paused <video> stays blank on iOS Safari until played.
    src: `${videoUrl}#t=0.001`,
    isHoisted: isOpen,
    hasFrame,
    onLoadedData: () => setHasFrame(true),
    // Both refs have to be stable: a fresh callback on every render would
    // make React detach and re-attach on every render too.
    setVideo: useCallback(
      (el: HTMLVideoElement | null) => {
        videoRef.current = el;
        slotRef.current.video = el;
      },
      [slotRef]
    ),
    setHome: useCallback(
      (el: HTMLDivElement | null) => void (slotRef.current.home = el),
      [slotRef]
    ),
  };
};

type HoistedVideoSourceProps = {
  slotRef: RefObject<HoistedVideoSlot>;
  videoUrl: string;
  /** The lightbox is open. */
  isOpen: boolean;
  /** The pointer is over the thumbnail. */
  isHovered: boolean;
  /** The thumbnail wears the lightbox's look: full colour, chips hidden. */
  isInColor: boolean;
  isContain?: boolean;
};

/**
 * The thumbnail's slot: where the `<video>` is rendered and where it returns
 * whenever the lightbox isn't showing it. It is rendered by React so it ships
 * in the prerendered HTML and the preload scanner can start fetching during
 * parse, rather than after hydration.
 */
export const HoistedVideoSource = ({
  slotRef,
  videoUrl,
  isOpen,
  isHovered,
  isInColor,
  isContain,
}: HoistedVideoSourceProps) => {
  const { src, isHoisted, hasFrame, onLoadedData, setVideo, setHome } = useHoistedVideo({
    slotRef,
    videoUrl,
    isOpen,
    isHovered,
  });

  return (
    <div ref={setHome} className="absolute inset-0">
      <video
        ref={setVideo}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={onLoadedData}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-300",
          {
            ["object-contain"]: isContain,
            ["pointer-events-none"]: !isHoisted,
            ["opacity-0"]: !hasFrame,
            [GRAYSCALE_CLASS]: !isInColor,
          }
        )}
      />
    </div>
  );
};

/**
 * The lightbox's slot. Mounting it lends the thumbnail's video to the
 * lightbox and unmounting hands it back, so paging through a gallery rewinds
 * this slide the same way the remounted ones rewind. The lending is done from
 * the ref because that is the one moment the slot is known to exist: a layout
 * effect in the component that renders both slots runs before this div's ref
 * is attached.
 */
export const HoistedVideoTarget = ({ slotRef }: { slotRef: RefObject<HoistedVideoSlot> }) => {
  // Stable, so that React attaches it once on mount and runs the cleanup once
  // on unmount. A fresh callback each render would hand the video back and
  // borrow it again — pausing it — on every unrelated re-render.
  const stage = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      slotRef.current.stage = el;
      if (slotRef.current.video) lend(el, slotRef.current.video);

      return () => {
        if (slotRef.current.stage === el) slotRef.current.stage = null;
        if (!slotRef.current.video) return;
        // On close the thumbnail has already taken the video back, so that it
        // has something to shrink into; only a gallery page-away lands here.
        // Rewinding it is the gallery's job, done where the page turn is.
        if (slotRef.current.video.parentElement === el && slotRef.current.home)
          reclaim(slotRef.current.home, slotRef.current.video);
      };
    },
    [slotRef]
  );

  return <div ref={stage} className="absolute inset-0" />;
};
