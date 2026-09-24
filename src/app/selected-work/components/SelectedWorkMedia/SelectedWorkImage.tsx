"use client";

import { useState } from "react";
import { Search } from "react-feather";
import { ContentfulImage } from "@/components/ContentfulImage";
import type { ContentfulAsset, SelectedWorkEntryFields } from "@/lib/contentful";
import { SelectedWorkLightbox } from "./SelectedWorkLightbox/SelectedWorkLightbox";
import { GRAYSCALE_CLASS, MediaChip, SelectedWorkThumbnail } from "./SelectedWorkThumbnail";
import { useLightboxState } from "./useLightboxState";
import { cn } from "cn";

const ZoomIcon = () => <Search size={20} color="currentColor" aria-hidden />;

type SelectedWorkImageProps = {
  isContain?: boolean;
  color?: string;
  title: string;
  description?: string;
  media: ContentfulAsset;
};

export const SelectedWorkImage = ({
  isContain,
  color,
  title,
  description,
  media,
}: SelectedWorkImageProps) => {
  const lightbox = useLightboxState();
  // The image is decoded and painted. Until then the container's flat
  // background stands in, so the thumbnail fades in instead of popping.
  // next/image re-runs `onLoad` for an image already complete at mount, so a
  // cached hit that lands before hydration still clears this.
  const [isLoaded, setIsLoaded] = useState(false);

  const layoutId = `media-${title}`;

  return (
    <>
      <SelectedWorkThumbnail
        layoutId={layoutId}
        label={`Open image: ${title}`}
        isClosing={lightbox.isClosing}
        isInColor={lightbox.isInColor}
        onOpen={lightbox.open}
        onSettle={lightbox.settle}
        className="cursor-zoom-in transition-colors duration-150 hover:bg-[#dedcd0]"
        renderChips={
          <MediaChip>
            <ZoomIcon />
          </MediaChip>
        }
      >
        <ContentfulImage
          asset={media}
          alt={title}
          sizes="(min-width: 768px) 768px, 100vw"
          className={cn(
            "h-full w-full object-cover transition-[opacity,filter] duration-300 select-none",
            {
              ["object-contain"]: isContain,
              ["opacity-0"]: !isLoaded,
              [GRAYSCALE_CLASS]: !lightbox.isInColor,
            }
          )}
          onLoad={() => setIsLoaded(true)}
          quality={100}
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
        <ContentfulImage
          asset={media}
          alt={title}
          sizes="(min-width: 768px) 768px, 100vw"
          className={cn("h-full w-full object-cover", {
            ["object-contain"]: isContain,
          })}
          quality={100}
        />
      </SelectedWorkLightbox>
    </>
  );
};
