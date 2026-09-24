import { useSyncExternalStore } from "react";

const subscribe = (onTick: () => void) => {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
};

/** Floored to the second so consecutive reads within a tick return the same snapshot. */
const getNow = () => Math.floor(Date.now() / 1000) * 1000;

/** Elapsed time since `since`, ticking every second. */
export const useTimer = (since: number) => {
  const now = useSyncExternalStore(subscribe, getNow, getNow);
  const time = Math.max(0, now - since);

  const msDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(time / msDay);
  const timeAfterDays = time - days * msDay;

  const msHour = 1000 * 60 * 60;
  const hours = Math.floor(timeAfterDays / msHour);
  const timeAfterHours = timeAfterDays - hours * msHour;

  const msMinute = 1000 * 60;
  const minutes = Math.floor(timeAfterHours / msMinute);
  const timeAfterMinutes = timeAfterHours - minutes * msMinute;

  const msSecond = 1000;
  const seconds = Math.floor(timeAfterMinutes / msSecond);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
