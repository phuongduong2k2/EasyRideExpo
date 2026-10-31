import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const useCounterSelector = () =>
  useSelector<RootState, number>((state) => state.counter.value);
