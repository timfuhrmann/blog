"use client";

import { useEffect } from "react";

export const ForgetHi = () => {
  useEffect(() => {
    void fetch("/api/forget-hi", { method: "POST" });
  }, []);

  return null;
};
