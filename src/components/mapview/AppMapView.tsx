import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, {
  Callout,
  EdgePadding,
  LongPressEvent,
  Marker,
  MarkerPressEvent,
  Polyline,
  Region,
} from "react-native-maps";
import { useMapView } from "../../hooks/useMapView";
import BottomSheetLocation from "./BottomSheetLocation";
import UserMarker from "./UserMarker";

const INITIAL_REGION: Region = {
  latitude: 21.0245,
  longitude: 105.84117,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
};

const MAP_PADDING: EdgePadding = {
  bottom: 300,
  top: 0,
  left: 0,
  right: 0,
};

type Props = {
  ref: React.RefObject<MapView | null>;
};

const AppMapView = ({ ref }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {
    currentCoordinates,
    isStartRouting,
    polylineCoordinates,
    selectedLocation,
    setSelectedLocation,
    startRouting,
    stopRouting,
  } = useMapView();

  const handleLongPress = (event: LongPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    ref.current?.animateToRegion({
      ...event.nativeEvent.coordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.01,
    });
    bottomSheetRef.current?.present();
  };

  const handleMarkerPress = (event: MarkerPressEvent) => {};

  const clearSelectedLocation = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  return (
    <>
      <MapView
        ref={ref}
        style={styles.map}
        region={INITIAL_REGION}
        onLongPress={handleLongPress}
        onMarkerPress={handleMarkerPress}
        showsCompass
        mapPadding={MAP_PADDING}
      >
        <UserMarker />
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <Callout tooltip />
          </Marker>
        )}
        {polylineCoordinates && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#3498db" // Blue route line
            strokeWidth={4}
          />
        )}
      </MapView>
      <BottomSheetLocation
        ref={bottomSheetRef}
        selectedLocation={null}
        // onSelectWaypoint={}
        onDismiss={clearSelectedLocation}
      />
    </>
  );
};

export default AppMapView;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
