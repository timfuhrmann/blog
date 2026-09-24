import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Layout } from "@/components/Layout/Layout";
import { SelectedWork } from "@/app/selected-work/components/SelectedWork/SelectedWork";
import { getSelectedWorkEntries, getSelectedWorkEntryBySlug } from "@/lib/contentful";
import type { Metadata } from "next";
import { Message } from "@/components/Message/Message";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Selected Work - Tim Fuhrmann",
  description: "A short tour of what I've built.",
};

export async function generateStaticParams() {
  const entries = await getSelectedWorkEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SelectedWorkPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getSelectedWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <Layout className="min-h-0 flex-1 [grid-template-rows:auto_auto_minmax(0,1fr)]">
        <Header
          renderIntro={
            <p className="body-md">
              <Message message={entry.message} />
            </p>
          }
        />
        <SelectedWork entries={entry.entries} />
      </Layout>
      <Footer />
    </>
  );
}
