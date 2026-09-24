"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
import { pathcat } from "pathcat";

const HI_PARAM = "hi";

type LinkProps = Omit<NextLinkProps, "href"> &
  Omit<ComponentProps<"a">, keyof NextLinkProps | "href"> & {
    href: string;
  };

const isInternal = (href: string) => href.startsWith("/");

const HiLink = ({ href, ...props }: LinkProps) => {
  const hi = useSearchParams().get(HI_PARAM);

  return (
    <NextLink
      href={hi && isInternal(href) ? pathcat(href, { [HI_PARAM]: hi }) : href}
      {...props}
    />
  );
};

/**
 * Drop-in wrapper around `next/link` that carries the `hi` search param along
 * with every in-app navigation, so the personalised greeting survives internal
 * links. External URLs and the param's absence are both left untouched. The
 * Suspense boundary keeps `useSearchParams` from opting whole pages into client
 * rendering — the fallback renders the plain link until the param resolves.
 */
export const Link = ({ href, ...props }: LinkProps) => (
  <Suspense fallback={<NextLink href={href} {...props} />}>
    <HiLink href={href} {...props} />
  </Suspense>
);
