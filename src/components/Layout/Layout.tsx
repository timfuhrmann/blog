import { cn } from "cn";
import { ComponentProps, CSSProperties, PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import styles from "./Layout.module.css";

export const Layout = ({ className, ...props }: PropsWithChildren<ComponentProps<"main">>) => (
  <main className={cn(styles.grid, "relative isolate font-medium", className)} {...props} />
);

export type ColLine =
  "bleed-start" | "content-start" | "split-1" | "center" | "split-2" | "content-end" | "bleed-end";

type Span = readonly [number, number];
export type ColSpan = [ColLine, ColLine];

const span = (s?: Span | ColSpan) => (s ? `${s[0]} / ${s[1]}` : undefined);

export type Placement = {
  /** Row line span, e.g. `[3, 4]`. */
  row?: Span;
  /** Column line span, e.g. `["content-start", "content-end"]`. */
  col?: ColSpan;
  /** Overrides at `>= md`, where the layout re-flows onto the wider grid. */
  md?: { row?: Span; col?: ColSpan };
};

const placementStyle = ({
  row = [1, 2],
  col = ["bleed-start", "bleed-end"],
  md,
}: Placement): CSSProperties =>
  ({
    "--row": span(row),
    "--col": span(col),
    "--row-md": span(md?.row),
    "--col-md": span(md?.col),
  }) as CSSProperties;

type AreaProps = ComponentProps<"div"> & Placement;

/**
 * Grid cell placed by `row` / `col`. `min-w-0` stops a cell blowing out its
 * column; a childless `Area` is decorative, so it's `pointer-events-none`.
 * Hairlines are not a cell concern — see `<GridLines>`.
 */
export const Area = ({ row, col, md, className, style, children, ...props }: AreaProps) => (
  <div
    className={cn(styles.area, "min-w-0", children == null && "pointer-events-none", className)}
    style={{ ...placementStyle({ row, col, md }), ...style }}
    {...props}
  >
    {children}
  </div>
);

const tvPadded = tv({
  base: "px-3 py-2",
  variants: {
    size: {
      md: "md:px-4 md:py-2.5",
      lg: "md:p-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type PaddedProps = AreaProps & VariantProps<typeof tvPadded>;

/** `Area` with the shared cell padding. */
export const Padded = ({ className, size, ...props }: PaddedProps) => (
  <Area className={tvPadded({ size, className })} {...props} />
);

/** A vertical rule on column line `x`, covering rows `rows`. */
export type VLine = { x: ColLine; rows: Span };

/** A horizontal rule on row line `y`, covering columns `cols`. */
export type HLine = { y: number; cols: ColSpan };

/** A set of rules: `v` verticals, `h` horizontals. */
export type Rules = { v?: VLine[]; h?: HLine[] };

const RULE = "bg-border-0 pointer-events-none";

const ruleDivs = ({ v = [], h = [] }: Rules, tag: string, hide: string | false) => [
  ...v.map((l) => (
    <div
      key={`v-${tag}-${l.x}-${l.rows[0]}`}
      aria-hidden
      className={cn(styles.area, RULE, "w-px justify-self-start", hide)}
      style={{ "--row": span(l.rows), "--col": l.x } as CSSProperties}
    />
  )),
  ...h.map((l) => (
    <div
      key={`h-${tag}-${l.y}-${l.cols[0]}`}
      aria-hidden
      className={cn(styles.area, RULE, "h-px self-start", hide)}
      style={{ "--row": `${l.y}`, "--col": span(l.cols) } as CSSProperties}
    />
  )),
];

/**
 * Every hairline on the page as a single full-length `<div>`, laid out on the
 * same grid as the content — one element per line keeps each rail straight
 * (per-cell borders round independently and jog at every track boundary).
 *
 * `v` / `h` describe the narrow grid. When `md` is given it's the full picture
 * for the wide six-column grid, and the narrow rules hide from `md` up. Drop it
 * in as a `<Layout>` child.
 */
export const GridLines = ({ md, ...base }: Rules & { md?: Rules }) => (
  <>
    {ruleDivs(base, "base", md ? "md:hidden" : false)}
    {md && ruleDivs(md, "md", "hidden md:block")}
  </>
);
