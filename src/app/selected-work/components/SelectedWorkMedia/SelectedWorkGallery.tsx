"use client";

import { useState } from "react";
import { Copy } from "react-feather";
import type { SelectedWorkEntryFields, SelectedWorkGalleryItemFields } from "@/lib/contentful";
import { GalleryItemMedia } from "./GalleryItemMedia";
import { HoistedVideoSource, HoistedVideoTarget, useHoistedVideoSlotRef } from "./HoistedVideo";
import { SelectedWorkLightbox } from "./SelectedWorkLightbox/SelectedWorkLightbox";
import {
  GRAYSCALE_CLASS,
  MediaChip,
  MediaCountChip,
  SelectedWorkThumbnail,
} from "./SelectedWorkThumbnail";
import { useLightboxState } from "./useLightboxState";
import { cn } from "cn";

type SelectedWorkGalleryProps = {
  entry: SelectedWorkEntryFields;
  items: SelectedWorkGalleryItemFields[];
};

export const SelectedWorkGallery = ({ entry, items }: SelectedWorkGalleryProps) => {
  const lightbox = useLightboxState();
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);

  const layoutId = `media-${entry.title}`;

  // The first item doubles as the card's preview, so when it is a video it
  // behaves exactly like a standalone one: it plays on hover and carries on
  // from where it got to when the lightbox opens onto it.
  const [preview] = items;
  const previewVideoUrl = preview.video && `https:${preview.video.fields.file.url}`;
  const previewSlotRef = useHoistedVideoSlotRef();

  const isPreviewOnStage = index === 0 && !!previewVideoUrl;

  const current = items[index];

  return (
    <>
      <SelectedWorkThumbnail
        layoutId={layoutId}
        label={`Open gallery: ${entry.title}`}
        isClosing={lightbox.isClosing}
        isInColor={lightbox.isInColor}
        onOpen={() => {
          setIndex(0);
          lightbox.open();
        }}
        onSettle={lightbox.settle}
        onHoverChange={setIsHovered}
        className="cursor-zoom-in"
        renderChips={
          <>
            <MediaChip>
              <GalleryIcon />
            </MediaChip>
            <MediaCountChip>1 / {items.length}</MediaCountChip>
          </>
        }
      >
        {previewVideoUrl ? (
          <HoistedVideoSource
            slotRef={previewSlotRef}
            videoUrl={previewVideoUrl}
            isOpen={lightbox.isOpen}
            isHovered={isHovered}
            isInColor={lightbox.isInColor}
            isContain={preview.isContain}
          />
        ) : (
          <GalleryItemMedia
            item={preview}
            variant="preview"
            className={cn("transition-[filter] duration-300", {
              [GRAYSCALE_CLASS]: !lightbox.isInColor,
            })}
          />
        )}
      </SelectedWorkThumbnail>

      <SelectedWorkLightbox
        isOpen={lightbox.isOpen}
        layoutId={layoutId}
        title={current.title || entry.title}
        description={current.description}
        color={current.color}
        onOpenChange={lightbox.onOpenChange}
        gallery={{
          index,
          items,
          onIndexChange: (next) => {
            // Paging off the preview leaves it paused at the start, so coming
            // back to it plays like any other slide rather than carrying on.
            const video = previewSlotRef.current.video;
            if (isPreviewOnStage && video) {
              video.pause();
              // oxlint-disable-next-line react/immutability
              video.currentTime = 0;
            }
            setIndex(next);
          },
        }}
      >
        {isPreviewOnStage ? (
          <HoistedVideoTarget slotRef={previewSlotRef} />
        ) : (
          <GalleryItemMedia key={index} item={current} variant="stage" />
        )}
      </SelectedWorkLightbox>
    </>
  );
};

const GalleryIcon = () => <Copy size={20} color="currentColor" aria-hidden />;
