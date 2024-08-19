import { cn } from "@/lib/cn";
import { times } from "ramda";
import { Fragment } from "react";
import styles from "./styles.module.scss";

type HeaderMarqueeProps = {
  text: string;
  initialLength: number;
};
export const HeaderMarquee = ({ text, initialLength }: HeaderMarqueeProps) => (
  <div className={cn(styles.marquee, "flex items-center gap-[--gap] overflow-hidden")}>
    {times(
      (index) => (
        <div
          key={index}
          className={cn(styles.marqueeAnimation, "flex items-center gap-[--gap] whitespace-nowrap")}
        >
          {times(
            (index) => (
              <Fragment key={index}>
                {text}
                <span className="inline-block size-[.3em] shrink-0 rounded-full bg-foreground-1" />
              </Fragment>
            ),
            initialLength
          )}
        </div>
      ),
      2
    )}
  </div>
);
