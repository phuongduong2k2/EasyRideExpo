import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import AppMapView from "../../components/mapview/AppMapView";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import ControlView, { RideMode } from "./ControlView";

const HomeScreen = () => {
  const mapRef = useRef<MapView>(null);

  const { currentCoordinates } = useCurrentLocation();
  const [rideMode, setRideMode] = useState<RideMode>("transport");

  const goToCurrentLocation = () => {
    mapRef.current?.animateToRegion({
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
      ...currentCoordinates!,
    });
  };

  const goToSearchScreen = () => {};

  return (
    <View style={styles.container}>
      <AppMapView ref={mapRef} />
      <ControlView
        rideMode={rideMode}
        onModeChange={setRideMode}
        onUserLocationPress={goToCurrentLocation}
        onSearchPress={goToSearchScreen}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
