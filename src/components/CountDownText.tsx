import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

type Props = {
  minutes?: number;
  onDone?: () => void;
};

const pad = (value: number) => value.toString().padStart(2, "0");

const CountDownText = ({ minutes = 5, onDone }: Props) => {
  const [time, setTime] = useState<string>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Computed inside the effect (not useMemo) since Date.now() is impure
    // and must not run during render.
    const countDownDate = Date.now() + minutes * 60 * 1000;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const distance = countDownDate - now;

      if (distance < 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTime("");
        onDone?.();
        return;
      }

      const remainingMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60),
      );
      const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(`${pad(remainingMinutes)}:${pad(remainingSeconds)}`);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [minutes, onDone]);

  return <Text>{time}</Text>;
};

export default CountDownText;
