import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../assets/colors";
import AppIcon from "../../components/AppIcon";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { HEXAGON_SIZE } from "../../navigation/CustomTabBar";

export type RideMode = "transport" | "delivery";

type Props = {
  rideMode: RideMode;
  onModeChange?: (mode: RideMode) => void;
  onUserLocationPress?: () => void;
  onSearchPress?: () => void;
};

const ControlView = ({
  rideMode,
  onModeChange,
  onUserLocationPress,
  onSearchPress,
}: Props) => {
  const bottomBarHeight = useBottomTabBarHeight();
  const { currentCoordinates } = useCurrentLocation();

  return (
    <View
      style={[
        styles.panel,
        { bottom: bottomBarHeight + HEXAGON_SIZE / 2 + 30 },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity style={styles.rentalButton} activeOpacity={0.85}>
          <Text style={styles.rentalButtonText}>Rental</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}
          disabled={!currentCoordinates}
          onPress={onUserLocationPress}
        >
          <AppIcon name="target" />
        </TouchableOpacity>
      </View>

      <View style={styles.group}>
        <TouchableOpacity style={styles.searchBar} onPress={onSearchPress}>
          <AppIcon name="search" width={24} height={24} />
          <Text style={styles.searchPlaceholder}>Where would you go?</Text>
          <AppIcon name="heart" width={24} height={24} />
        </TouchableOpacity>

        <View style={styles.tabsCard}>
          <Pressable
            style={[
              styles.tabItem,
              rideMode === "transport" && styles.tabItemActive,
            ]}
            onPress={() => onModeChange?.("transport")}
          >
            <Text
              style={[
                styles.tabLabel,
                rideMode === "transport" && styles.tabLabelActive,
              ]}
            >
              Transport
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabItem,
              rideMode === "delivery" && styles.tabItemActive,
            ]}
            onPress={() => onModeChange?.("delivery")}
          >
            <Text
              style={[
                styles.tabLabel,
                rideMode === "delivery" && styles.tabLabelActive,
              ]}
            >
              Delivery
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ControlView;

export const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 14,
    right: 14,
  },
  rentalButton: {
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  rentalButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.white,
  },
  group: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.primaryLight,
    padding: 14,
  },
  searchBar: {
    height: 54,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
    marginBottom: 13,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.textPlaceholder,
  },
  tabsCard: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    flexDirection: "row",
    padding: 1,
  },
  tabItem: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    backgroundColor: COLORS.primary,
  },
  tabLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.textSecondary,
  },
  tabLabelActive: {
    color: COLORS.white,
  },
});
