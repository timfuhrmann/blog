import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const tvButton = tv({
  base: "body-md inline-flex cursor-pointer items-center gap-2.5 tracking-[0.04em] uppercase transition-colors",
  variants: {
    variant: {
      primary:
        "bg-foreground-0 text-foreground-2 hover:bg-layer-1 hover:text-foreground-0 active:bg-layer-1 active:text-foreground-0",
      outline:
        "border-2 border-[currentColor]/40 bg-transparent text-[currentColor] hover:bg-[currentColor]/10 active:bg-[currentColor]/10",
    },
    size: {
      sm: "",
      md: "",
    },
    hasIconOnly: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { hasIconOnly: true, size: "sm", class: "p-2" },
    { hasIconOnly: true, size: "md", class: "p-2 md:p-3.5" },
    { hasIconOnly: false, size: "sm", class: "px-3 py-2" },
    { hasIconOnly: false, size: "md", class: "px-3 py-2 md:px-5 md:py-3.5" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    hasIconOnly: false,
  },
});

type CommonProps = VariantProps<typeof tvButton> & {
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

export const Button = ({
  variant,
  size,
  hasIconOnly,
  className,
  children,
  ...props
}: ButtonAsLink | ButtonAsButton) => {
  const classes = tvButton({ variant, size, hasIconOnly, className });

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
