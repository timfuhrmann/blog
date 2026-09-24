import { notFound } from "next/navigation";
import { HomeView } from "@/app/(home)/components/HomeView/HomeView";
import { Cue } from "@/components/Cue/Cue";
import { getSelectedWorkEntries, getSelectedWorkEntryBySlug } from "@/lib/contentful";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getSelectedWorkEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function SelectedWorkSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getSelectedWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <HomeView>
      <Cue message={entry.toast} />
    </HomeView>
  );
}
