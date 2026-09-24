"use client";
import { useTimer } from "@/lib/hooks/useTimer";

export const HEADER_TIMER_ID = "header-timer";

type HeaderTimerProps = {
  since: number;
};
export const HeaderTimer = ({ since }: HeaderTimerProps) => {
  const { days, hours, minutes, seconds } = useTimer(since);
  return (
    // The static HTML is stale; headerTimerScript rewrites it before paint, so hydration sees different text.
    <span id={HEADER_TIMER_ID} suppressHydrationWarning>
      {/* A single text node, matching what the script writes. */}
      {[days, hours, minutes, seconds].map(formatNumber).join(":")}
    </span>
  );
};

/** Must produce the same output as HeaderTimer, so there is no jump once React takes over. */
export const headerTimerScript = (since: number) =>
  `(()=>{var t=Date.now()-${since},e=document.getElementById("${HEADER_TIMER_ID}");` +
  `e&&(e.textContent=[t/864e5,t/36e5%24,t/6e4%60,t/1e3%60].map(function(n){return String(Math.floor(n)).padStart(2,"0")}).join(":"))})()`;

const formatNumber = (num: number) => String(num).padStart(2, "0");
