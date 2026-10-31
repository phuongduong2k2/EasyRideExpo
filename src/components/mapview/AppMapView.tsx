import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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
import BottomSheetLocation from "./BottomSheetLocation/BottomSheetLocation";
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
  ref?: React.RefObject<AppMapViewRef | null>;
  isViewOnly?: boolean;
};

export type AppMapViewRef = {
  animateToUser: () => void;
};

const AppMapView = ({ ref, isViewOnly = true }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  const {
    currentCoordinates,
    polylineCoordinates,
    selectedLocation,
    setSelectedLocation,
    routingQuery,
  } = useMapView();

  useImperativeHandle(ref, () => ({
    animateToUser: goToUser,
  }));

  const handleLongPress = (event: LongPressEvent) => {
    if (isViewOnly) return;
    setSelectedLocation(event.nativeEvent.coordinate);
    mapRef?.current?.animateToRegion({
      ...event.nativeEvent.coordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.01,
    });
    bottomSheetRef.current?.present();
  };

  const handleMarkerPress = (event: MarkerPressEvent) => {};

  const goToUser = () => {
    if (currentCoordinates) {
      mapRef?.current?.animateToRegion({
        ...currentCoordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleMapReady = () => {
    bottomSheetRef.current?.present();
    setTimeout(() => goToUser(), 1000);
  };

  useEffect(() => {
    if (polylineCoordinates) {
      mapRef.current?.fitToCoordinates(polylineCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [polylineCoordinates]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={INITIAL_REGION}
        onLongPress={handleLongPress}
        onMarkerPress={handleMarkerPress}
        showsCompass
        mapPadding={MAP_PADDING}
        onMapReady={handleMapReady}
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
            strokeColor="#3498db"
            strokeWidth={4}
          />
        )}
      </MapView>
      <Pressable
        style={{ position: "absolute", zIndex: 100, top: 200 }}
        onPress={() =>
          console.log({
            selectedLocation,
            currentCoordinates,
            polylineCoordinates,
          })
        }
      >
        <Text>dasdasd</Text>
      </Pressable>
      {!isViewOnly && (
        <BottomSheetLocation
          ref={bottomSheetRef}
          selectedLocation={selectedLocation}
          onGoToUser={goToUser}
          onCancel={navigation.goBack}
          onBookNow={() => routingQuery.refetch()}
        />
      )}
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
