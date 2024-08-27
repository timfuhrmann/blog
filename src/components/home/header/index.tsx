import { HeaderMarquee } from "@/components/home/header/HeaderMarquee";
import { HeaderTimer } from "@/components/home/header/HeaderTimer";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <div className={cn(styles.grid, "relative isolate h-svh min-h-[32.5rem] font-medium")}>
      <Padded className="[grid-area:1/1/2/2] md:[grid-area:1/2/2/3]">
        <h1>
          Tim
          <br />
          Fuhrmann
        </h1>
      </Padded>
      <Padded className="hidden [grid-area:1/3/2/4] md:block">
        <HeaderTimer ms={Date.now() - Date.parse("03-19-1998")} />
      </Padded>
      <Padded className="pb-12 [grid-area:1/2/2/3] md:[grid-area:1/4/2/5]">
        <p className="max-w-[20rem] indent-10 md:indent-12">
          I&apos;m a creative web developer with a keen eye for detail, based in Stuttgart. I love
          creating interfaces with a beautiful and strong user experience.
        </p>
      </Padded>
      <Padded className="flex items-center leading-none [grid-area:1/3/2/4] [writing-mode:vertical-lr] md:[grid-area:1/6/2/7]">
        @DEPT
      </Padded>
      <Area
        className={cn(
          styles.textSecondary,
          "p-4 text-center font-sans font-bold uppercase [grid-area:2/1/3/4] md:[grid-area:2/3/3/5]"
        )}
      >
        <h2>Creative Web Developer</h2>
      </Area>
      <Area
        className={cn(
          styles.textPrimary,
          "px-1 py-4 text-center font-sans font-black uppercase tracking-wider [grid-area:4/2/5/3] md:[grid-area:4/4/5/5]"
        )}
      >
        Tim
      </Area>
      <Area className="border-y border-foreground-0/20 p-0 [grid-area:6/1/7/4] md:[grid-area:6/1/7/7]">
        <div
          className={cn(
            styles.textSecondary,
            "bg-layer-1 py-4 font-sans font-bold uppercase text-foreground-1"
          )}
        >
          <HeaderMarquee text="Blog coming soon" initialLength={4} />
        </div>
      </Area>
      <Padded className="flex items-center justify-end gap-4 [grid-area:7/1/8/7]">
        <Link
          href="https://www.linkedin.com/in/tim-fuhrmann/"
          target="_blank"
          className="text-foreground-0/60 hover:text-foreground-0"
        >
          [ LinkedIn ]
        </Link>
      </Padded>
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
  <div className={cn("bg-foreground-0/20", className)} />
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
