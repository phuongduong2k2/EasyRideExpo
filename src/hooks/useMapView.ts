import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LatLng } from "react-native-maps";
import { Car } from "../screens/map/BottomSheetLocation/types";
import { geoapifyService } from "../services/geoapify/GeoapifyService";
import { useCurrentLocation } from "./useCurrentLocation";

export const useMapView = (car: Car | null) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const { currentCoordinates } = useCurrentLocation();

  const routingQuery = useQuery({
    queryKey: [
      "routing",
      selectedLocation?.latitude,
      selectedLocation?.longitude,
      currentCoordinates?.latitude,
      currentCoordinates?.longitude,
      car?.key,
    ],
    queryFn: () =>
      geoapifyService.getRouting({
        from: currentCoordinates!,
        to: selectedLocation!,
      }),
    enabled: false,
  });

  const driverRoutingQuery = useQuery({
    queryKey: [
      "driverRouting",
      currentCoordinates?.latitude,
      currentCoordinates?.longitude,
      car?.key,
    ],
    queryFn: () =>
      geoapifyService.getRouting({
        from: car?.coordinates!,
        to: currentCoordinates!,
      }),
    enabled: false,
  });

  return {
    selectedLocation,
    routingQuery,
    driverRoutingQuery,
    currentCoordinates,
    setSelectedLocation,
    polylineCoordinates: routingQuery.data?.features[0].geometry.coordinates
      .flat()
      .map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      })),
    driverPolylineCoordinates:
      driverRoutingQuery.data?.features[0].geometry.coordinates
        .flat()
        .map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        })),
  };
};
