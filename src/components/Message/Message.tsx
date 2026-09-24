import { Fragment } from "react";
import Image from "next/image";
import { Link } from "@/components/Link";

const TOKEN_RE = /(<wave\s*\/>|<selected-work>[\s\S]*?<\/selected-work>)/g;
const SELECTED_WORK_RE = /^<selected-work>([\s\S]*?)<\/selected-work>$/;

type MessageProps = {
  message: string;
  /** Render the `<selected-work>` token as plain text instead of a link — for
   * when the message is already nested inside its own link. */
  disableLinks?: boolean;
  /** Bump this to replay the wave on demand (e.g. on hover) instead of the
   * default once-on-mount play. The wave span remounts on every change, so
   * each bump runs a fresh, uninterruptible animation regardless of what
   * triggered it. */
  waveTrigger?: number;
};
export const Message = ({ message, disableLinks, waveTrigger }: MessageProps) => {
  return message.split(TOKEN_RE).map((part, i) => {
    if (/^<wave\s*\/>$/.test(part)) {
      return waveTrigger === undefined ? (
        <Image
          key={i}
          src="/waving-hand.png"
          alt="👋"
          width={20}
          height={20}
          className="animate-wave inline-block h-[1.1em] w-[1.1em] [transform-origin:70%_70%] align-[-0.15em]"
        />
      ) : (
        <Image
          key={`${i}-${waveTrigger}`}
          src="/waving-hand.png"
          alt="👋"
          width={20}
          height={20}
          className="animate-wave-hover inline-block h-[1.1em] w-[1.1em] [transform-origin:70%_70%] align-[-0.15em]"
        />
      );
    }

    const selectedWork = part.match(SELECTED_WORK_RE);
    if (selectedWork) {
      if (disableLinks) {
        return (
          <span key={i} className="underline">
            {selectedWork[1]}
          </span>
        );
      }

      return (
        <Link key={i} href="/selected-work" className="underline">
          {selectedWork[1]}
        </Link>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
};
