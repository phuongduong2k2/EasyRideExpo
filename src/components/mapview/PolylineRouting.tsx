import { LatLng, Polyline } from "react-native-maps";
import { Car } from "../../screens/map/BottomSheetLocation/types";
import CarMarker from "./CarMarker";

type Props = {
  polylineCoordinates?: LatLng[];
  driverPolylineCoordinates?: LatLng[];
  car: Car | null;
};

const PolylineRouting = ({
  polylineCoordinates = [],
  driverPolylineCoordinates = [],
  car,
}: Props) => {
  return (
    <>
      <Polyline
        coordinates={polylineCoordinates}
        strokeColor={"#3498db"}
        strokeWidth={4}
      />
      {driverPolylineCoordinates.length > 0 && car && (
        <CarMarker polylineCoordinates={driverPolylineCoordinates} car={car} />
      )}
    </>
  );
};

export default PolylineRouting;
