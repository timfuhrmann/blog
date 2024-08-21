import { cn } from "@/lib/cn";
import { Analytics } from "@vercel/analytics/react";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(suisse.className, "overscroll-none leading-tight antialiased")}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Tim Fuhrmann",
  description:
    "I'm Tim, a creative web developer with a keen eye for detail, based in Stuttgart. I love creating interfaces with a beautiful and strong user experience.",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        type: "image/png",
        url: "/favicon/apple-icon.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "57x57",
        url: "/favicon/apple-icon-57x57.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "60x60",
        url: "/favicon/apple-icon-60x60.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "72x72",
        url: "/favicon/apple-icon-72x72.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "76x76",
        url: "/favicon/apple-icon-76x76.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "120x120",
        url: "/favicon/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "144x144",
        url: "/favicon/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "152x152",
        url: "/favicon/apple-icon-152x152.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        url: "/favicon/apple-icon-180x180.png",
      },
    ],
  },
};
