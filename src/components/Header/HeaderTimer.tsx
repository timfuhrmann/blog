"use client";
import { useTimer } from "@/lib/hooks/useTimer";

type HeaderTimerProps = {
  ms: number;
};
export const HeaderTimer = ({ ms }: HeaderTimerProps) => {
  const { days, hours, minutes, seconds } = useTimer(ms);
  return (
    <>
      {formatNumber(days)}:{formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
    </>
  );
};

const formatNumber = (num: number) =>
  num.toLocaleString(undefined, {
    useGrouping: false,
    minimumIntegerDigits: 2,
  });
