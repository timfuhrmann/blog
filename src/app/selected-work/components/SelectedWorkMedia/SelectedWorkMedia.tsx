import type { SelectedWorkEntryFields } from "@/lib/contentful";
import { SelectedWorkGallery } from "./SelectedWorkGallery";
import { SelectedWorkImage } from "./SelectedWorkImage";
import { SelectedWorkVideo } from "./SelectedWorkVideo";

type SelectedWorkMediaProps = {
  entry: SelectedWorkEntryFields;
};

export const SelectedWorkMedia = ({ entry }: SelectedWorkMediaProps) => {
  const gallery = entry.gallery ?? [];

  if (gallery.length > 1) {
    return <SelectedWorkGallery entry={entry} items={gallery} />;
  }

  const [first] = gallery;

  if (first?.video) {
    return (
      <SelectedWorkVideo
        isContain={first.isContain}
        color={first.color}
        title={first.title ?? entry.title}
        description={first.description}
        videoUrl={`https:${first.video.fields.file.url}`}
      />
    );
  }

  if (first?.image) {
    return (
      <SelectedWorkImage
        isContain={first.isContain}
        color={first.color}
        title={first.title ?? entry.title}
        description={first.description}
        media={first.image}
      />
    );
  }

  return null;
};
