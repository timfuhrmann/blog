import Image, { type ImageLoader, type ImageProps } from "next/image";
import { pathcat } from "pathcat";
import type { ContentfulAsset } from "@/lib/contentful";

type ContentfulImageProps = Omit<ImageProps, "src" | "loader" | "width" | "height"> & {
  asset: ContentfulAsset;
};

export const ContentfulImage = ({ asset, alt, sizes, ...rest }: ContentfulImageProps) => {
  const { file, description, title } = asset.fields;
  const dimensions = file.details.image ?? { width: 1600, height: 1067 };

  return (
    <Image
      loader={contentfulLoader}
      src={file.url}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      alt={alt ?? description ?? title}
      {...rest}
    />
  );
};

const contentfulLoader: ImageLoader = ({ src, width, quality }) => {
  const url = src.startsWith("//") ? `https:${src}` : src;
  return pathcat(url, {
    fm: "webp",
    w: width,
    q: quality ?? 90,
  });
};
