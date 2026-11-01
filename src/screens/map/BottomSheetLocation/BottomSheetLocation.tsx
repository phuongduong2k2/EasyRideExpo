import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { fetchAsync } from "expo/src/async-require/fetchAsync.native.ts";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LatLng } from "react-native-maps";
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/colors";
import { geoapifyService } from "../../../services/geoapify/GeoapifyService";
import AppIcon from "../../../components/AppIcon";
import SelectVehicleStep from "./SelectVehicleStep";
import { Car, Driver, Step } from "./types";
import WaitingDriverStep from "./WaitingDriverStep";
import WaypointStep, { NoWaypointSelected } from "./WaypointStep";

type Props = {
  selectedLocation: LatLng | null;
  onGoToUser?: () => void;
  onCancel?: () => void;
  onBookNow?: () => Promise<any>;
};

const BottomSheetLocation = ({
  selectedLocation,
  onGoToUser,
  onCancel,
  onBookNow,
}: Props) => {
  const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "40%", "50%"], []);
  const [step, setStep] = useState<Step>(Step.Waypoint);
  const insets = useSafeAreaInsets();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isFetchingDriver, setIsFetchingDriver] = useState(false);

  const geocodingQuery = useQuery({
    queryKey: [
      "geocoding",
      selectedLocation?.latitude,
      selectedLocation?.longitude,
    ],
    queryFn: () => geoapifyService.getReverseGeocoding(selectedLocation!),
    enabled: !!selectedLocation,
  });

  const clear = () => {
    setStep(Step.Waypoint);
    setSelectedCar(null);
    setDriver(null);
  };

  useEffect(() => {
    clear();
    ref?.current?.present();
  }, [selectedLocation]);

  const handleBookNow = async () => {
    setIsFetchingDriver(true);
    try {
      const [randomDriverRes, data] = await Promise.all([
        fetchAsync("https://randomuser.me/api"),
        onBookNow?.(),
      ]);
      console.log(JSON.stringify(data));

      ref?.current?.snapToIndex(1);
      setDriver(JSON.parse(randomDriverRes.body).results[0]);
      setStep(Step.WaitingDriver);
    } catch (error) {
      clear();
    }
    setIsFetchingDriver(false);
  };

  const renderStep = () => {
    if (!selectedLocation) {
      return <NoWaypointSelected />;
    }
    switch (step) {
      case Step.Waypoint:
        return (
          <WaypointStep
            data={geocodingQuery.data}
            ref={ref}
            onSelectWaypoint={setStep}
            insets={insets}
            isLoading={geocodingQuery.isFetching}
          />
        );
      case Step.SelectVehicle:
        return (
          <SelectVehicleStep
            insets={insets}
            selectedCar={selectedCar}
            isFetchingDriver={isFetchingDriver}
            onSelectCar={setSelectedCar}
            onBookNow={handleBookNow}
          />
        );
      case Step.WaitingDriver:
        return (
          driver && (
            <WaitingDriverStep
              insets={insets}
              driver={driver}
              selectedCar={selectedCar}
              onCancel={onCancel}
            />
          )
        );
      default:
        return null;
    }
  };

  const bottomSheetPosition = useSharedValue(-1000);
  const viewPos = useDerivedValue(() => {
    return bottomSheetPosition.value - 50;
  });

  return (
    <>
      <Animated.View style={[styles.goToUserContainer, { top: viewPos }]}>
        <TouchableOpacity onPress={onGoToUser} style={styles.goToUserButton}>
          <AppIcon name="target" />
        </TouchableOpacity>
      </Animated.View>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enableHandlePanningGesture={false}
        animatedPosition={bottomSheetPosition}
        enableContentPanningGesture={false}
        backgroundStyle={styles.sheetBackground}
      >
        <BottomSheetView style={styles.sheetContent}>
          {renderStep()}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default memo(BottomSheetLocation);

const styles = StyleSheet.create({
  goToUserContainer: {
    height: 50,
    position: "absolute",
    right: 20,
    zIndex: 100,
  },
  goToUserButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetBackground: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  sheetContent: {
    paddingHorizontal: 20,
    flex: 1,
    gap: 10,
  },
});
