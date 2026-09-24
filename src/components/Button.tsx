import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "cn";

export const tvButton = tv({
  base: "body-md inline-flex items-center gap-2.5 tracking-[0.04em] uppercase transition-colors",
  variants: {
    variant: {
      primary: "bg-foreground-0 text-foreground-2 hover:bg-layer-1 hover:text-foreground-0",
      outline:
        "border-2 border-[currentColor]/40 bg-transparent text-[currentColor] hover:bg-[currentColor]/10",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type CommonProps = VariantProps<typeof tvButton> & {
  children: ReactNode;
  hasIconOnly?: boolean;
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
  hasIconOnly,
  className,
  children,
  ...props
}: ButtonAsLink | ButtonAsButton) => {
  const classes = cn(
    hasIconOnly ? "p-2 md:p-3.5" : "px-3 py-2 md:px-5 md:py-3.5",
    tvButton({ variant, className })
  );

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
