import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const useRecentPlacesSelector = () =>
  useSelector<RootState, string[]>((state) => state.recentPlaces.places);
