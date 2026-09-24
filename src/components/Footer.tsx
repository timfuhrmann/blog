"use client";

import { cn } from "cn";
import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="border-border-0 flex shrink-0 items-center justify-end gap-4 border-t px-3 py-2 md:px-4 md:py-2.5">
      {pathname !== "/" && <FooterLink href="/">[ Home ]</FooterLink>}
      <FooterLink href="https://www.linkedin.com/in/tim-fuhrmann/" target="_blank">
        [ LinkedIn ]
      </FooterLink>
    </footer>
  );
};

const FooterLink = ({ className, ...props }: ComponentProps<typeof Link>) => (
  <Link
    className={cn("body-md text-foreground-0/60 hover:text-foreground-0", className)}
    {...props}
  />
);
