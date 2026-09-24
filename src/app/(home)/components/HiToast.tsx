"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Message } from "@/components/Message/Message";
import { showToast } from "@/components/Toast";

type HiToastProps = {
  message: string;
};

const TOAST_ID = "hi-toast";

/**
 * Fires the greeting toast when the personalised `/home/[slug]` page mounts and
 * clears it again on unmount (navigating away) or when the visitor closes it.
 */
export const HiToast = ({ message }: HiToastProps) => {
  useEffect(() => {
    showToast(<Message message={message} />, {
      id: TOAST_ID,
      duration: Infinity,
    });

    return () => {
      toast.dismiss(TOAST_ID);
    };
  }, [message]);

  return null;
};
