"use client";

import { HeaderTimer } from "@/components/Header/HeaderTimer";
import { useState } from "react";

export const HeaderBirthday = () => {
  const [showBirthday, setShowBirthday] = useState(false);

  return (
    <button
      type="button"
      aria-label="Toggle birthday"
      className="cursor-pointer"
      onClick={() => setShowBirthday((prevState) => !prevState)}
    >
      {showBirthday ? "19.03.1998" : <HeaderTimer ms={Date.now() - new Date(1998, 2, 19).getTime()} />}
    </button>
  );
};
