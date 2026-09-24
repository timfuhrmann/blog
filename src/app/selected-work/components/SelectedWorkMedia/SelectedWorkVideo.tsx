"use client";

import { useState } from "react";
import { Play } from "react-feather";
import { HoistedVideoSource, HoistedVideoTarget, useHoistedVideoSlotRef } from "./HoistedVideo";
import { SelectedWorkLightbox } from "./SelectedWorkLightbox/SelectedWorkLightbox";
import { MediaChip, SelectedWorkThumbnail } from "./SelectedWorkThumbnail";
import { useLightboxState } from "./useLightboxState";

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

  const layoutId = `media-${title}`;

  const slotRef = useHoistedVideoSlotRef();

  return (
    <>
      <SelectedWorkThumbnail
        layoutId={layoutId}
        label={`Open ${title}`}
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
        onClose={lightbox.close}
      >
        <HoistedVideoTarget slotRef={slotRef} />
      </SelectedWorkLightbox>
    </>
  );
};
const PlayIcon = () => <Play size={20} color="currentColor" fill="currentColor" aria-hidden />;
