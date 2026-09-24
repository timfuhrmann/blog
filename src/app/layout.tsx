import { cn } from "cn";
import { Analytics } from "@/components/Analytics";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="lg:overscroll-none">
      <body
        data-root
        className={cn(
          GeistMono.variable,
          GeistSans.variable,
          "bg-layer-0 text-foreground-0 2xl:border-border-0 mx-auto my-0 flex flex-col font-mono text-sm leading-tight antialiased 2xl:border-x"
        )}
      >
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Tim Fuhrmann",
  description:
    "I'm Tim, a senior software engineer with a keen eye for detail. I care about how software feels, so I build interfaces with a strong user experience, and the systems behind them, from idea to production.",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.ico",
      },
      {
        rel: "icon shortcut",
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
