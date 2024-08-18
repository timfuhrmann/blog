"use client";
import { HeaderMarquee } from "@/components/home/header/HeaderMarquee";
import { HeaderTimer } from "@/components/home/header/HeaderTimer";
import { cn } from "@/lib/cn";
import { ComponentProps, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type HeaderProps = {
  ms: number;
};
export const Header = ({ ms }: HeaderProps) => {
  return (
    <div className={cn(styles.grid, "relative isolate h-svh font-medium")}>
      <BorderVertical className="[grid-area:3/2/6/3] md:[grid-area:1/2/6/3]" />
      <BorderVertical className="hidden [grid-area:1/3/6/4] md:block" />
      <BorderVertical className="[grid-area:1/2/2/3] md:[grid-area:1/4/2/5]" />
      <BorderVertical className="hidden [grid-area:3/4/6/5] md:block" />
      <BorderVertical className="[grid-area:3/3/6/4] md:[grid-area:1/5/6/6]" />
      <BorderVertical className="[grid-area:1/3/2/4] md:[grid-area:1/6/6/7]" />
      <BorderHorizontal className="[grid-area:2/1/3/4] md:[grid-area:2/1/3/7]" />
      <BorderHorizontal className="[grid-area:3/1/4/4] md:[grid-area:3/1/4/7]" />
      <BorderHorizontal className="[grid-area:4/2/5/3] md:[grid-area:4/4/5/5]" />
      <BorderHorizontal className="[grid-area:5/2/6/3] md:[grid-area:5/4/6/5]" />
      <Padded className="[grid-area:1/1/2/2] md:[grid-area:1/2/2/3]">
        <h1>
          Tim
          <br />
          Fuhrmann
        </h1>
      </Padded>
      <Padded className="hidden [grid-area:1/3/2/4] md:block">
        <HeaderTimer ms={ms} />
      </Padded>
      <Padded className="[grid-area:1/2/2/3] md:[grid-area:1/4/2/5]">
        <p className="max-w-[22rem] indent-10 md:indent-28">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </Padded>
      <Padded className="flex items-center leading-none [grid-area:1/3/2/4] [writing-mode:vertical-lr] md:[grid-area:1/6/2/7]">
        @DEPT
      </Padded>
      <Area
        className={cn(
          styles.textSecondary,
          "p-4 text-center font-semibold uppercase [grid-area:2/1/3/4] md:[grid-area:2/3/3/5]"
        )}
      >
        <h2>Creative Web Developer</h2>
      </Area>
      <Area
        className={cn(
          styles.textPrimary,
          "px-1 py-4 text-center font-black uppercase tracking-wider [grid-area:4/2/5/3] md:[grid-area:4/4/5/5]"
        )}
      >
        Tim
      </Area>
      <Area className="border-foreground/20 border-y p-0 [grid-area:6/1/7/4] md:[grid-area:6/1/7/7]">
        <div
          className={cn(
            styles.textSecondary,
            "bg-primary py-4 font-semibold uppercase text-neutral-950"
          )}
        >
          <HeaderMarquee text="Blog coming soon" initialLength={4} />
        </div>
      </Area>
    </div>
  );
};

const BorderHorizontal = ({ className, ...props }: ComponentProps<typeof Border>) => (
  <Border {...props} className={cn("h-[1px]", className)} />
);
const BorderVertical = ({ className, ...props }: ComponentProps<typeof Border>) => (
  <Border {...props} className={cn("w-[1px]", className)} />
);
type BorderProps = {
  className?: string;
};
const Border = ({ className }: BorderProps) => (
  <div className={cn("bg-foreground/20", className)} />
);

type PaddedProps = {
  className?: string;
};
const Padded = ({ className, children }: PropsWithChildren<PaddedProps>) => (
  <Area className={cn("px-3 py-2 md:px-4 md:py-2.5", className)}>{children}</Area>
);

type AreaProps = {
  className?: string;
};
const Area = ({ className, children }: PropsWithChildren<AreaProps>) => (
  <div className={cn("min-w-0", className)}>{children}</div>
);
