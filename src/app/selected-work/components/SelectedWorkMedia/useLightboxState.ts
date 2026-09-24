"use client";

import { useState } from "react";

/**
 * Open/close state shared by every selected-work thumbnail that opens a
 * lightbox. `isClosing` covers the stretch where the lightbox shrinks back
 * into the thumbnail: the thumbnail has to keep wearing the lightbox's look
 * until the shared-layout animation lands, or the two swap appearance
 * mid-flight.
 */
export const useLightboxState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  return {
    isOpen,
    isClosing,
    /** The thumbnail wears the lightbox's look: full colour, chips hidden. */
    isInColor: isOpen || isClosing,
    open: () => setIsOpen(true),
    close: () => {
      setIsClosing(true);
      setIsOpen(false);
    },
    /** The thumbnail's shared-layout animation has landed. */
    settle: () => setIsClosing(false),
  };
};
