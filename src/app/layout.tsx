import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.scss";

const suisse = localFont({
  src: [
    {
      path: "./(misc)/font/suisse/SuisseIntl-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-Regular.woff2",
      weight: "400",
    },

    {
      path: "./(misc)/font/suisse/SuisseIntl-Medium.woff2",
      weight: "500",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-Bold.woff2",
      weight: "700",
    },
    {
      path: "./(misc)/font/suisse/SuisseIntl-Black.woff2",
      weight: "800",
    },
  ],
});

export const metadata: Metadata = {
  title: "Tim Fuhrmann",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(suisse.className, "overscroll-none leading-tight antialiased")}>
        {children}
      </body>
    </html>
  );
}
