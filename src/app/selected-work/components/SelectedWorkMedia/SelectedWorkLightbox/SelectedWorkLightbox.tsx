"use client";

import { AnimatePresence, motion } from "motion/react";
import { ComponentProps, PropsWithChildren, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "react-feather";
import { Button } from "@/components/Button";
import type { SelectedWorkGalleryItemFields } from "@/lib/contentful";
import { GalleryItemMedia } from "../GalleryItemMedia";
import { useSelectedWorkScroll } from "../../SelectedWork/SelectedWorkScroll";
import { cn } from "cn";
import styles from "./SelectedWorkLightbox.module.css";

type SelectedWorkLightboxGallery = {
  index: number;
  items: SelectedWorkGalleryItemFields[];
  onIndexChange: (index: number) => void;
};

type SelectedWorkLightboxProps = {
  isOpen: boolean;
  layoutId: string;
  title: string;
  description?: string;
  color?: string;
  onClose: () => void;
  onLayoutAnimationComplete?: () => void;
  /** Only passed when there is more than one item. */
  gallery?: SelectedWorkLightboxGallery;
};

const pad = (n: number) => String(n).padStart(2, "0");

export const SelectedWorkLightbox = ({
  isOpen,
  layoutId,
  title,
  description,
  color,
  onClose,
  onLayoutAnimationComplete,
  gallery,
  children,
}: PropsWithChildren<SelectedWorkLightboxProps>) => {
  const { setIsPaused } = useSelectedWorkScroll();

  // Pause the track's wheel hijacking while this lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    setIsPaused(true);
    return () => setIsPaused(false);
  }, [isOpen, setIsPaused]);

  useEffect(() => {
    if (!isOpen) return;
    const step = (d: number) => {
      if (gallery)
        gallery.onIndexChange((gallery.index + d + gallery.items.length) % gallery.items.length);
    };
    const onKey = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, gallery]);

  const step = (d: number) => {
    if (gallery)
      gallery.onIndexChange((gallery.index + d + gallery.items.length) % gallery.items.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          layoutRoot
          className="text-foreground-2 fixed inset-0 isolate"
          initial={{ pointerEvents: "auto", zIndex: 50 }}
          animate={{ pointerEvents: "auto", zIndex: 50 }}
          exit={{ pointerEvents: "none", zIndex: 51 }}
        >
          <motion.div
            className="bg-foreground-0/90 absolute inset-0 -z-[1] cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <div
            className={cn(
              gallery ? styles.gridGallery : styles.grid,
              "pointer-events-none absolute top-0 left-0 h-full w-full overflow-y-auto p-4 md:p-6"
            )}
          >
            <div className="[grid-area:head]">
              <div className="flex items-center">
                {gallery && (
                  <LazyDiv className="body-md tracking-widest">
                    {pad(gallery.index + 1)} / {pad(gallery.items.length)}
                  </LazyDiv>
                )}

                <LazyDiv className="ml-auto">
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="pointer-events-auto flex cursor-pointer items-center justify-center"
                  >
                    <X size={20} aria-hidden />
                  </button>
                </LazyDiv>
              </div>
            </div>

            {gallery && (
              <div className="flex items-start justify-end py-1 [grid-area:prev] md:items-center">
                <LazyButton
                  hasIconOnly
                  variant="outline"
                  aria-label="Previous"
                  onClick={() => step(-1)}
                  className="pointer-events-auto"
                >
                  <ArrowLeft size={18} aria-hidden />
                </LazyButton>
              </div>
            )}

            <div className="mx-auto flex w-full min-w-0 justify-center [grid-area:media]">
              <motion.div
                layoutId={layoutId}
                layoutCrossfade={false}
                onLayoutAnimationComplete={onLayoutAnimationComplete}
                className="border-border-0 bg-layer-2 pointer-events-auto relative aspect-[4/3] max-h-full w-full max-w-full overflow-hidden border md:w-[clamp(56rem,50vw,80rem)]"
                style={color ? { backgroundColor: color } : undefined}
              >
                {children}
              </motion.div>
            </div>

            {gallery && (
              <div className="flex items-start py-1 [grid-area:next] md:items-center">
                <LazyButton
                  hasIconOnly
                  variant="outline"
                  aria-label="Next"
                  onClick={() => step(1)}
                  className="pointer-events-auto"
                >
                  <ArrowRight size={18} aria-hidden />
                </LazyButton>
              </div>
            )}

            <LazyDiv className="[grid-area:text]">
              <div className="pointer-events-auto pb-4 text-center md:mx-auto md:max-w-3xl">
                <h3 className="body-md mb-2 tracking-wide uppercase">{title}</h3>
                {description && <p className="body-sm text-ghost-1">{description}</p>}
              </div>
            </LazyDiv>

            {gallery && (
              <LazyDiv className="hidden [grid-area:gallery] md:block">
                <div className="pointer-events-auto flex justify-center gap-2 overflow-x-auto">
                  {gallery.items.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show item ${i + 1}`}
                      aria-current={i === gallery.index}
                      onClick={() => gallery.onIndexChange(i)}
                      className={cn(
                        "border-border-0 bg-layer-2 relative aspect-[4/3] w-[clamp(3.5rem,4vw,8rem)] shrink-0 cursor-pointer overflow-hidden border opacity-40 transition-opacity duration-150 hover:opacity-100",
                        { ["border-foreground-2 opacity-100"]: i === gallery.index }
                      )}
                    >
                      <GalleryItemMedia item={item} variant="thumbnail" />
                    </button>
                  ))}
                </div>
              </LazyDiv>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MotionButton = motion.create(Button);

const LazyButton = (props: ComponentProps<typeof MotionButton>) => (
  <MotionButton
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.3 } }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    {...props}
  />
);

const LazyDiv = (props: ComponentProps<typeof motion.div>) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.3 } }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    {...props}
  />
);
