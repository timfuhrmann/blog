"use client";

import { useState } from "react";
import { ArrowRight } from "react-feather";
import { Link } from "@/components/Link";
import { Message } from "@/components/Message/Message";

type CueProps = {
  message: string;
};

export const Cue = ({ message }: CueProps) => {
  const [isWaving, setIsWaving] = useState(false);

  return (
    <div className="border-border-0 shrink-0 border-t font-medium">
      <Link
        href="/selected-work"
        className="group bg-layer-1 text-foreground-1 flex flex-wrap items-center justify-between gap-4 px-4 py-4 no-underline md:px-6"
        onMouseEnter={() => {
          setIsWaving(true);
        }}
        onAnimationEnd={() => setIsWaving(false)}
      >
        <p className="body-md">
          <Message message={message} disableLinks waving={isWaving} />
        </p>
        <span className="body-md flex shrink-0 items-center gap-2.5 tracking-wide uppercase">
          Selected work{" "}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={16} aria-hidden />
          </span>
        </span>
      </Link>
    </div>
  );
};
