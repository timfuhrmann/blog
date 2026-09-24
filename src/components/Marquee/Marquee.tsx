"use client";

import { times } from "ramda";
import { Fragment } from "react";

import styles from "./Marquee.module.css";
import { cn } from "cn";

const REPEAT = 4;

export const Marquee = () => {
  return (
    <div className="border-border-0 shrink-0 border-t">
      <div className="fluid-display-sm bg-layer-1 text-foreground-1 py-4 font-bold uppercase">
        <div className="flex items-center overflow-hidden">
          {times(
            (rowIndex) => (
              <div
                key={rowIndex}
                className={cn(styles.marqueeAnimation, "flex items-center whitespace-nowrap")}
              >
                {times(
                  (index) => (
                    <Fragment key={index}>
                      <span className="px-4">Blog coming soon</span>
                      <span className="bg-foreground-1 inline-block size-[.3em] shrink-0 rounded-full" />
                    </Fragment>
                  ),
                  REPEAT
                )}
              </div>
            ),
            2
          )}
        </div>
      </div>
    </div>
  );
};
