import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import { geoapifyService } from "../services/geoapify/GeoapifyService";
import { useCurrentLocation } from "./useCurrentLocation";

export const useMapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [isStartRouting, setIsStartRouting] = useState(false);
  const { currentCoordinates } = useCurrentLocation();
  const [polylineCoordinates, setPolylineCoordinates] = useState<LatLng[]>([]);

  const routingQuery = useQuery({
    queryKey: ["routing"],
    queryFn: () =>
      geoapifyService.getRouting({
        from: selectedLocation!,
        to: currentCoordinates!,
      }),
    enabled: !!selectedLocation && !!currentCoordinates && isStartRouting,
  });

  const rawCoordinates =
    routingQuery.data && routingQuery.data?.features[0].geometry.coordinates[0];

  useEffect(() => {
    if (rawCoordinates) {
      setPolylineCoordinates(
        rawCoordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        })),
      );
    } else setPolylineCoordinates([]);
  }, [rawCoordinates]);

  const startRouting = () => {
    setIsStartRouting(true);
  };

  const stopRouting = () => {
    setIsStartRouting(false);
    setPolylineCoordinates([]);
  };

  return {
    selectedLocation,
    isStartRouting,
    currentCoordinates,
    setSelectedLocation,
    polylineCoordinates,
    startRouting,
    stopRouting,
  };
};
