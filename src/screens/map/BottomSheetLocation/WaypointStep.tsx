import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/colors";
import { IMAGES } from "../../../assets/images";
import { ReverseGeocodingResponse } from "../../../services/geoapify/types";
import { Step } from "./types";

type Props = {
  ref?: React.RefObject<BottomSheetModal | null>;
  onSelectWaypoint: (step: Step) => void;
  isLoading?: boolean;
  insets: EdgeInsets;
  data?: ReverseGeocodingResponse;
};

const heightScreen = Dimensions.get("window").height;

export const NoWaypointSelected = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>Please select way point</Text>
    <Image
      source={IMAGES.onboard_3}
      contentFit="contain"
      style={styles.emptyImage}
    />
  </View>
);

const WaypointStep = ({
  ref,
  onSelectWaypoint,
  isLoading = false,
  insets,
  data,
}: Props) => {
  return (
    <View
      style={{
        height: heightScreen * 0.2 - insets.top,
        justifyContent: "center",
      }}
    >
      {isLoading && <ActivityIndicator size={"large"} color={COLORS.accent} />}
      {data && (
        <>
          <View>
            <Text style={styles.address}>
              {data.features[0].properties.formatted}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              ref?.current?.snapToIndex(2);
              onSelectWaypoint(Step.SelectVehicle);
            }}
            style={styles.selectButton}
          >
            <Text style={styles.selectButtonLabel}>Select this way point</Text>
          </TouchableOpacity>
        </>
      )}
      {!isLoading && !data && (
        <Text style={{ textAlign: "center" }}>Do not have data</Text>
      )}
    </View>
  );
};

export default WaypointStep;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
  },
  emptyTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  emptyImage: {
    height: 80,
    aspectRatio: 351 / 201,
  },
  address: {
    fontWeight: "500",
  },
  selectButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  selectButtonLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
