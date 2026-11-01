import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LatLng, Marker, Polyline } from "react-native-maps";
import { Car } from "../../screens/map/BottomSheetLocation/types";
import AppIcon from "../AppIcon";

type Props = {
  polylineCoordinates: LatLng[];
  car: Car;
};

const STEP_INTERVAL_MS = 1000;

const CarMarker = ({ polylineCoordinates, car }: Props) => {
  const markerRef = useRef<InstanceType<typeof Marker>>(null);

  const [remainingCoordinates, setRemainingCoordinates] =
    useState(polylineCoordinates);

  useEffect(() => {
    setRemainingCoordinates(polylineCoordinates);
  }, [polylineCoordinates]);

  useEffect(() => {
    if (remainingCoordinates.length <= 1) return;

    const timer = setTimeout(() => {
      const next = remainingCoordinates[1];
      markerRef.current?.animateMarkerToCoordinate(next, STEP_INTERVAL_MS);

      setRemainingCoordinates((prev) => prev.slice(1));
    }, STEP_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [remainingCoordinates]);

  return (
    <>
      <Polyline
        coordinates={remainingCoordinates}
        strokeColor={"#db9034"}
        strokeWidth={4}
      />
      <Marker
        ref={markerRef}
        coordinate={remainingCoordinates[0] ?? car.coordinates}
      >
        <View style={styles.carShadow}>
          <AppIcon name={car.carIcon} height={30} width={(30 * 9) / 16} />
        </View>
      </Marker>
    </>
  );
};

export default CarMarker;

export const styles = StyleSheet.create({
  carShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
