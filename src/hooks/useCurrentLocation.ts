import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useCurrentLocation = () => {
  const [currentCoordinates, setCurrentCoordinates] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const curPosition = await Location.getCurrentPositionAsync();
        setCurrentCoordinates(curPosition.coords);
      } catch (error) {
        Alert.alert("Error", "Get current location failed");
      }
    }

    getCurrentLocation();
  }, []);

  return { currentCoordinates };
};
