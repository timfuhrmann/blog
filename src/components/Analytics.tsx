"use client";

import { Analytics as VercelAnalytics, type BeforeSendEvent } from "@vercel/analytics/react";

const beforeSend = (event: BeforeSendEvent) => {
  const url = new URL(event.url);
  const hi = url.searchParams.get("hi");

  if (!hi) return event;

  url.searchParams.delete("hi");
  url.pathname = `${url.pathname.replace(/\/$/, "")}/${encodeURIComponent(hi)}`;

  return { ...event, url: url.toString() };
};

export const Analytics = () => <VercelAnalytics beforeSend={beforeSend} />;
