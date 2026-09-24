import "server-only";

import { cache } from "react";
import { pathcat } from "pathcat";
import { env } from "@/env";

/**
 * Minimal Contentful Delivery API client. Server-only: it reads the space id
 * and access token from {@link env}, which itself cannot be imported client-side.
 */

const BASE_URL = "https://cdn.contentful.com";

/** A resolved Contentful image asset (an item of a selected-work gallery). */
export interface ContentfulAsset {
  sys: { id: string; type: "Asset" };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      fileName: string;
      contentType: string;
      details: {
        size: number;
        image?: { width: number; height: number };
      };
    };
  };
}

export interface SelectedWorkGalleryItemFields {
  title?: string;
  description?: string;
  isContain?: boolean;
  color?: string;
  image: ContentfulAsset;
  video?: ContentfulAsset;
}

export interface SelectedWorkEntryFields {
  title: string;
  year: string;
  description: string;
  gallery?: SelectedWorkGalleryItemFields[];
}

export interface SelectedWorkFields {
  internalName: string;
  slug: string;
  toast: string;
  message: string;
  entries: SelectedWorkEntryFields[];
}

interface ContentfulLink {
  sys: { type: "Link"; linkType: "Entry" | "Asset"; id: string };
}

interface RawEntry {
  sys: { id: string; type: string };
  fields: Record<string, unknown>;
}

interface EntriesResponse {
  items: RawEntry[];
  includes?: {
    Entry?: RawEntry[];
    Asset?: ContentfulAsset[];
  };
}

const isLink = (value: unknown): value is ContentfulLink =>
  typeof value === "object" && value !== null && (value as ContentfulLink).sys?.type === "Link";

/**
 * Recursively replace Contentful link objects with the entities they point at,
 * pulled from the response's `includes`. Entry links flatten to their `fields`;
 * asset links resolve to the whole asset. Unresolved links are dropped.
 */
const resolveLinks = (
  value: unknown,
  assets: Map<string, ContentfulAsset>,
  entries: Map<string, RawEntry>
): unknown => {
  if (Array.isArray(value)) {
    return value
      .map((item) => resolveLinks(item, assets, entries))
      .filter((item) => item !== undefined);
  }

  if (isLink(value)) {
    if (value.sys.linkType === "Asset") {
      return assets.get(value.sys.id);
    }
    const entry = entries.get(value.sys.id);
    return entry ? resolveLinks(entry.fields, assets, entries) : undefined;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, resolveLinks(val, assets, entries)])
    );
  }

  return value;
};

const fetchEntries = async <Fields>(params: Record<string, string>): Promise<Fields[]> => {
  const url = pathcat(BASE_URL, "/spaces/:space_id/environments/master/entries", {
    space_id: env.CONTENTFUL_SPACE_ID,
    access_token: env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
    include: "2",
    ...params,
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Contentful request failed: ${res.status} ${res.statusText}`);
  }

  const data: EntriesResponse = await res.json();
  const assets = new Map((data.includes?.Asset ?? []).map((asset) => [asset.sys.id, asset]));
  const entries = new Map((data.includes?.Entry ?? []).map((entry) => [entry.sys.id, entry]));

  return data.items.map((item) => resolveLinks(item.fields, assets, entries) as Fields);
};

export const getSelectedWorkEntries = cache(async (): Promise<SelectedWorkFields[]> => {
  return fetchEntries<SelectedWorkFields>({ content_type: "selectedWork" });
});

export const getSelectedWorkEntryBySlug = cache(
  async (slug: string): Promise<SelectedWorkFields | null> => {
    const items = await fetchEntries<SelectedWorkFields>({
      content_type: "selectedWork",
      "fields.slug": slug,
      limit: "1",
    });

    return items[0] ?? null;
  }
);
