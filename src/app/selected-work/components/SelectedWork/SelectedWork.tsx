"use client";

import { Area, Padded } from "@/components/Layout/Layout";
import { motion } from "motion/react";
import type { SelectedWorkEntryFields } from "@/lib/contentful";
import { SelectedWorkMedia } from "../SelectedWorkMedia/SelectedWorkMedia";
import { SelectedWorkNav } from "./SelectedWorkNav";
import { SelectedWorkScrollProvider } from "./SelectedWorkScroll";
import { cn } from "cn";
import styles from "./SelectedWork.module.css";

type SelectedWorkProps = {
  entries: SelectedWorkEntryFields[];
};

export const SelectedWork = ({ entries }: SelectedWorkProps) => (
  <SelectedWorkScrollProvider>
    {(trackRef) => (
      <>
        <Padded
          row={[2, 3]}
          size="lg"
          className="border-border-0 relative z-10 flex items-end justify-between gap-4 border-b"
        >
          <h2 className="fluid-display-md font-black uppercase">Selected Work</h2>
          <SelectedWorkNav trackRef={trackRef} />
        </Padded>

        {/* The track reaches up under the header so its clip covers the
            viewport: a thumbnail shrinking back out of the lightbox animates
            inside the track, and would otherwise be cut off at its top edge.
            Subgrid keeps the cards in row 3; the header sits above it. */}
        <Area row={[1, 4]} className="grid min-h-0 grid-rows-subgrid">
          <motion.div
            ref={trackRef}
            data-track
            layoutScroll
            className={cn(
              styles.track,
              "row-span-full grid min-h-0 auto-cols-[min(21.5rem,85%)] grid-flow-col grid-rows-subgrid overflow-x-auto overscroll-x-contain lg:auto-cols-[max(21.5rem,30%)]"
            )}
          >
            {entries.map((item) => (
              <article
                key={item.title}
                className="border-border-0 row-start-3 flex flex-col border-r px-3 py-4 md:p-6"
              >
                <div className="body-md font-medium">{item.year}</div>
                <div className="mt-4 mb-5 flex items-center gap-2.5">
                  <span className="bg-layer-1 size-3 shrink-0" />
                  <span className="bg-border-0 h-px flex-1" />
                </div>
                <h3 className="fluid-display-xs mb-3 font-extrabold uppercase">{item.title}</h3>
                <p className="text-ghost-0 body-sm">{item.description}</p>

                {item.gallery && item.gallery.length > 0 && (
                  <div className="mt-4 flex flex-1 items-end">
                    <SelectedWorkMedia entry={item} />
                  </div>
                )}
              </article>
            ))}
          </motion.div>
        </Area>
      </>
    )}
  </SelectedWorkScrollProvider>
);
