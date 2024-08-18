import { useEffect, useRef, useState } from "react";

export const useTimer = (ms: number) => {
  const initialDate = useRef(Date.now());
  const initialMsRef = useRef(ms);
  const [time, setTime] = useState(Math.max(0, ms));

  useEffect(() => {
    const timeout = setInterval(() => {
      requestAnimationFrame(() => {
        setTime(initialMsRef.current + (Date.now() - initialDate.current));
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

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
