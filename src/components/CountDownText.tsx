import { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";

type Props = {
  minutes?: number;
  onDone?: () => void;
};
let x: any = null;

const CountDownText = ({ minutes = 5, onDone }: Props) => {
  const [time, setTime] = useState<string>();

  const countDownDate = useMemo(
    () => Date.now() + minutes * 60 * 1000,
    [minutes],
  );

  useEffect(() => {
    x = setInterval(function () {
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(`${minutes}:${seconds}`);

      if (distance < 0) {
        clearInterval(x);
        setTime("timeout!");
        onDone?.();
      }
    }, 1000);

    return () => {
      clearInterval(x);
    };
  }, []);

  return <Text>{time}</Text>;
};

export default CountDownText;
