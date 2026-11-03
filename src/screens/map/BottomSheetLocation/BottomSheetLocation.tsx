import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { fetchAsync } from "expo/src/async-require/fetchAsync.native.ts";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/colors";
import AppButton from "../../../components/AppButton";
import AppIcon from "../../../components/AppIcon";
import { geoapifyService } from "../../../services/geoapify/GeoapifyService";

import { DIMENTIONS } from "../../../constants";
import { MapContext } from "../../../context/mapContext";
import { RoutingResponse } from "../../../services/geoapify/types";
import SelectVehicleStep from "./SelectVehicleStep";
import { Step } from "./types";
import WaitingDriverStep from "./WaitingDriverStep";
import WaypointStep, { NoWaypointSelected } from "./WaypointStep";

type Props = {
  selectedLocation: LatLng | null;
  onGoToUser?: () => void;
  onCancel?: () => void;
  onBookDriver?: () => Promise<any>;
  onStart?: () => Promise<QueryObserverResult<RoutingResponse, Error>>;
};

const BottomSheetLocation = ({
  selectedLocation,
  onGoToUser,
  onCancel,
  onBookDriver,
  onStart,
}: Props) => {
  const ref = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  const { car, driver, setCar, setDriver, setStep, step } =
    useContext(MapContext);
  const snapPoints = useMemo(() => ["20%", "40%", "50%"], []);

  const [isFetchingDriver, setIsFetchingDriver] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [minuteCount, setMinuteCount] = useState<number>(0);

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
    setCar(null);
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
        onBookDriver?.(),
      ]);
      ref?.current?.snapToIndex(0);
      setDriver(JSON.parse(randomDriverRes.body).results[0]);
      setStep(Step.ConfirmStart);
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
            selectedCar={car}
            isFetchingDriver={isFetchingDriver}
            onSelectCar={setCar}
            onBookNow={handleBookNow}
          />
        );
      case Step.ConfirmStart:
        return (
          <View
            style={{
              height: DIMENTIONS.height * 0.2 - insets.top,
              justifyContent: "center",
            }}
          >
            <AppButton
              isLoading={isConfirming}
              onPress={async () => {
                setIsConfirming(true);
                try {
                  const respon = await onStart?.();
                  ref.current?.snapToIndex(1);
                  const coordinateLength =
                    respon?.data?.features[0].geometry.coordinates.flat()
                      .length ?? 0;
                  if (coordinateLength) {
                    setMinuteCount(coordinateLength / 60);
                  }
                  setStep(Step.WaitingDriver);
                } catch (error) {
                  console.log(error);
                }
                setIsConfirming(false);
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                Let's Start
              </Text>
            </AppButton>
          </View>
        );
      case Step.WaitingDriver:
        return (
          driver && (
            <WaitingDriverStep
              minutes={minuteCount}
              insets={insets}
              driver={driver}
              selectedCar={car}
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
