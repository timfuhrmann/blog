"use client";

import { motion } from "motion/react";
import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "cn";

/** Thumbnail media is grey until hovered or focused; the lightbox's copy never is. */
export const GRAYSCALE_CLASS = "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0";

type SelectedWorkThumbnailProps = {
  layoutId: string;
  label: string;
  /** The lightbox is shrinking back into this thumbnail. */
  isClosing: boolean;
  /** Match the lightbox's look: full colour, chips hidden. */
  isInColor: boolean;
  onOpen: () => void;
  onSettle: () => void;
  onHoverChange?: (isHovered: boolean) => void;
  /** Overlay chips; each one positions itself against the thumbnail's edges. */
  renderChips?: ReactNode;
  className?: string;
};

/**
 * The card's media tile: the shared-layout origin the lightbox grows out of
 * and shrinks back into, plus the chips that label what opening it will do.
 */
export const SelectedWorkThumbnail = ({
  layoutId,
  label,
  isClosing,
  isInColor,
  onOpen,
  onSettle,
  onHoverChange,
  renderChips,
  className,
  children,
}: PropsWithChildren<SelectedWorkThumbnailProps>) => (
  <motion.button
    type="button"
    layoutId={layoutId}
    layoutCrossfade={false}
    // Above the exiting lightbox (zIndex 51) so the fading backdrop can't cover it.
    style={{ zIndex: isClosing ? 52 : 0 }}
    onClick={onOpen}
    onLayoutAnimationComplete={onSettle}
    onMouseEnter={() => onHoverChange?.(true)}
    onMouseLeave={() => onHoverChange?.(false)}
    aria-label={label}
    className={cn(
      "group border-border-0 bg-layer-2 relative mt-auto flex aspect-[4/3] w-full items-end overflow-hidden border text-left",
      className
    )}
  >
    {children}
    {renderChips && (
      <span
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 flex w-full items-end justify-between p-3 transition-opacity duration-300 will-change-transform",
          {
            ["opacity-0"]: isInColor,
          }
        )}
      >
        {renderChips}
      </span>
    )}
  </motion.button>
);

/** The square icon chip in the thumbnail's bottom-left corner. */
export const MediaChip = ({ children }: PropsWithChildren) => (
  <span className="bg-foreground-0/70 text-foreground-2 flex size-11 items-center justify-center">
    {children}
  </span>
);

/** The `1 / 4` counter in the thumbnail's bottom-right corner. */
export const MediaCountChip = ({ children }: PropsWithChildren) => (
  <span className="bg-foreground-0/70 body-sm text-foreground-2 px-2 py-1 tracking-wide">
    {children}
  </span>
);
