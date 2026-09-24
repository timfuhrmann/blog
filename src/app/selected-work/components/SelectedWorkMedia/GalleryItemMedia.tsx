import { ContentfulImage } from "@/components/ContentfulImage";
import type { SelectedWorkGalleryItemFields } from "@/lib/contentful";
import { cn } from "cn";

const setInitialVolume = (el: HTMLVideoElement | null) => {
  if (el) el.volume = 0.25;
};

export const GalleryItemMedia = ({
  item,
  variant,
  className,
}: {
  item: SelectedWorkGalleryItemFields;
  variant: "preview" | "stage" | "thumbnail";
  className?: string;
}) => {
  const isStage = variant === "stage";
  const isThumbnail = variant === "thumbnail";

  if (item.image) {
    return (
      <ContentfulImage
        asset={item.image}
        alt={isThumbnail ? "" : (item.title ?? "")}
        sizes={isThumbnail ? "56px" : "(min-width: 768px) 768px, 100vw"}
        quality={isThumbnail ? undefined : 100}
        className={cn(
          "h-full w-full object-cover select-none",
          { ["object-contain"]: item.isContain && !isThumbnail },
          className
        )}
      />
    );
  }

  if (item.video) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption -- Contentful assets have no caption track available
      <video
        src={`https:${item.video.fields.file.url}#t=0.001`}
        muted={!isStage}
        ref={setInitialVolume}
        controls={isStage}
        aria-hidden={isThumbnail || undefined}
        playsInline
        preload="metadata"
        className={cn(
          "h-full w-full object-cover",
          { ["object-contain"]: item.isContain && !isThumbnail },
          className
        )}
      />
    );
  }

  return null;
};
