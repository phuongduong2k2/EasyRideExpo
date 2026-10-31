import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LatLng } from "react-native-maps";
import { geoapifyService } from "../services/geoapify/GeoapifyService";
import { useCurrentLocation } from "./useCurrentLocation";

export const useMapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const { currentCoordinates } = useCurrentLocation();

  const routingQuery = useQuery({
    queryKey: [
      "routing",
      selectedLocation?.latitude,
      selectedLocation?.longitude,
      currentCoordinates?.latitude,
      currentCoordinates?.longitude,
    ],
    queryFn: () =>
      geoapifyService.getRouting({
        from: selectedLocation!,
        to: currentCoordinates!,
      }),
    enabled: false,
  });

  return {
    selectedLocation,
    routingQuery,
    currentCoordinates,
    setSelectedLocation,
    polylineCoordinates: routingQuery.data?.features[0].geometry.coordinates
      .flat()
      .map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      })),
  };
};
