import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  EdgePadding,
  LatLng,
  LongPressEvent,
  Marker,
  MarkerPressEvent,
  Region,
} from "react-native-maps";
import { useMapView } from "../../hooks/useMapView";

import { QueryObserverResult } from "@tanstack/react-query";
import { MapContext } from "../../context/mapContext";
import { RoutingResponse } from "../../services/geoapify/types";
import PolylineRouting from "./PolylineRouting";
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

export type AppMapViewOverlayProps = {
  selectedLocation: LatLng | null;
  onGoToUser: () => void;
  fetchRouting: () => Promise<any>;
  fetchDriverRouting: () => Promise<
    QueryObserverResult<RoutingResponse, Error>
  >;
};

type Props = {
  ref?: React.RefObject<AppMapViewRef | null>;
  renderOverlay?: (props: AppMapViewOverlayProps) => React.ReactNode;
};

export type AppMapViewRef = {
  animateToUser: () => void;
};

const AppMapView = ({ ref, renderOverlay }: Props) => {
  if (Platform.OS === "android") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Do not support Android yet!</Text>
      </View>
    );
  }

  const mapRef = useRef<MapView>(null);
  const isViewOnly = !renderOverlay;

  const { car, clear } = useContext(MapContext);

  const {
    currentCoordinates,
    polylineCoordinates,
    selectedLocation,
    setSelectedLocation,
    routingQuery,
    driverRoutingQuery,
    driverPolylineCoordinates,
  } = useMapView(car);

  useImperativeHandle(ref, () => ({
    animateToUser: goToUser,
  }));

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  const handleLongPress = (event: LongPressEvent) => {
    if (isViewOnly) return;
    setSelectedLocation(event.nativeEvent.coordinate);
    mapRef?.current?.animateToRegion({
      ...event.nativeEvent.coordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.01,
    });
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

  useEffect(() => {
    if (driverPolylineCoordinates) {
      mapRef.current?.fitToCoordinates(
        polylineCoordinates?.concat(driverPolylineCoordinates),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        },
      );
    }
  }, [driverPolylineCoordinates, polylineCoordinates]);

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
        <PolylineRouting
          car={car}
          polylineCoordinates={polylineCoordinates}
          driverPolylineCoordinates={driverPolylineCoordinates}
        />
      </MapView>
      {renderOverlay?.({
        selectedLocation,
        onGoToUser: goToUser,
        fetchRouting: () => routingQuery.refetch(),
        fetchDriverRouting: () => driverRoutingQuery.refetch(),
      })}
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
