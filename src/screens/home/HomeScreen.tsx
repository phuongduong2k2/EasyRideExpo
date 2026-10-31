import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppMapView, { AppMapViewRef } from "../../components/mapview/AppMapView";
import ControlView, { RideMode } from "./ControlView";

const HomeScreen = () => {
  const mapRef = useRef<AppMapViewRef>(null);
  const navigation = useNavigation();

  const [rideMode, setRideMode] = useState<RideMode>("transport");

  const goToCurrentLocation = () => {
    mapRef.current?.animateToUser();
  };

  const goToSearchScreen = () => navigation.navigate("Map");

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
