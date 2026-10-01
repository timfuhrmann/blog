"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { Play } from "react-feather";
import { setInitialVolume } from "./GalleryItemMedia";
import { HoistedVideoSource, HoistedVideoTarget, useHoistedVideoSlotRef } from "./HoistedVideo";
import { SelectedWorkLightbox } from "./SelectedWorkLightbox/SelectedWorkLightbox";
import { MediaChip, SelectedWorkThumbnail } from "./SelectedWorkThumbnail";
import { useLightboxState } from "./useLightboxState";
import { cn } from "cn";

type SelectedWorkVideoProps = {
  isContain?: boolean;
  color?: string;
  title: string;
  description?: string;
  videoUrl: string;
};

export const SelectedWorkVideo = ({
  isContain,
  color,
  title,
  description,
  videoUrl,
}: SelectedWorkVideoProps) => {
  const lightbox = useLightboxState();
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const layoutId = `media-${title}`;

  const slotRef = useHoistedVideoSlotRef();

  return (
    <>
      <SelectedWorkThumbnail
        layoutId={layoutId}
        label={`Play video: ${title}`}
        isOpen={lightbox.isOpen}
        isClosing={lightbox.isClosing}
        isInColor={lightbox.isInColor}
        onOpen={lightbox.open}
        onSettle={lightbox.settle}
        onHoverChange={setIsHovered}
        className="cursor-zoom-in"
        renderChips={
          <MediaChip>
            <PlayIcon />
          </MediaChip>
        }
      >
        <HoistedVideoSource
          slotRef={slotRef}
          videoUrl={videoUrl}
          isOpen={lightbox.isOpen}
          isHovered={isHovered}
          isInColor={lightbox.isInColor}
          isContain={isContain}
        />
      </SelectedWorkThumbnail>

      <SelectedWorkLightbox
        isOpen={lightbox.isOpen}
        layoutId={layoutId}
        title={title}
        description={description}
        color={color}
        onOpenChange={lightbox.onOpenChange}
      >
        {shouldReduceMotion ? (
          // Reduced motion: the thumbnail keeps its video, the lightbox plays its own.
          // eslint-disable-next-line jsx-a11y/media-has-caption -- Contentful assets have no caption track available
          <video
            src={`${videoUrl}#t=0.001`}
            ref={setInitialVolume}
            controls
            playsInline
            preload="metadata"
            className={cn("h-full w-full object-cover", { ["object-contain"]: isContain })}
          />
        ) : (
          <HoistedVideoTarget slotRef={slotRef} />
        )}
      </SelectedWorkLightbox>
    </>
  );
};
const PlayIcon = () => <Play size={20} color="currentColor" fill="currentColor" aria-hidden />;
