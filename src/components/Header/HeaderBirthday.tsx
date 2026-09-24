"use client";

import { HeaderTimer, headerTimerScript } from "@/components/Header/HeaderTimer";
import { useState, useSyncExternalStore } from "react";

const BIRTHDAY = Date.parse("1998-03-19T00:00:00+01:00");

const noopSubscribe = () => () => {};

export const HeaderBirthday = () => {
  const [showBirthday, setShowBirthday] = useState(false);
  // True during SSR and hydration only; client-side mounts (e.g. navigation) render live time and skip the script.
  const isServerRender = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => true
  );

  return (
    <>
      <button
        type="button"
        aria-label="Toggle birthday"
        className="cursor-pointer"
        onClick={() => setShowBirthday((prevState) => !prevState)}
      >
        {showBirthday ? "1998/03/19" : <HeaderTimer since={BIRTHDAY} />}
      </button>
      {/* Runs during HTML parsing, before paint and before React loads. */}
      {isServerRender && (
        <script dangerouslySetInnerHTML={{ __html: headerTimerScript(BIRTHDAY) }} />
      )}
    </>
  );
};
