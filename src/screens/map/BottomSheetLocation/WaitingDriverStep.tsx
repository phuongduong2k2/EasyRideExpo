import { Image } from "expo-image";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/colors";
import { getRandomArbitrary } from "../../../utils/utils";
import AppIcon from "../../../components/AppIcon";
import BreakLine from "../../../components/BreakLine";
import CountDownText from "../../../components/CountDownText";
import { Car, Driver } from "./types";

const heightScreen = Dimensions.get("window").height;

type Props = {
  insets: EdgeInsets;
  driver: Driver;
  selectedCar: Car | null;
  onCancel?: () => void;
};

let x: any = null;

const WaitingDriverStep = ({
  insets,
  driver,
  selectedCar,
  onCancel,
}: Props) => {
  return (
    <View
      style={[styles.container, { height: heightScreen * 0.4 - insets.top }]}
    >
      <Text style={styles.etaText}>
        Your driver is comming in <CountDownText minutes={4} />
      </Text>
      <BreakLine />
      <View style={styles.driverRow}>
        <Image
          source={{ uri: driver.picture.large }}
          contentFit="contain"
          style={styles.driverAvatar}
        />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>
            {`${driver.name.first} ${driver.name.last}`}
          </Text>
          <Text>Phone number: {driver.phone}</Text>
          <View style={styles.inlineRow}>
            <AppIcon name="map" width={10} />
            <Text style={styles.mutedText}>{selectedCar?.description}</Text>
          </View>
          <View style={styles.inlineRow}>
            <AppIcon name="small_star" />
            <Text style={styles.mutedText}>
              {getRandomArbitrary(1, 5).toFixed(1)}{" "}
              {`(${getRandomArbitrary(100, 600).toFixed()}) reviews`}
            </Text>
          </View>
        </View>
        <Image
          source={selectedCar?.image}
          contentFit="contain"
          style={styles.carImage}
        />
      </View>
      <BreakLine />
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Payment</Text>
        <Text style={styles.paymentValue}>{selectedCar?.price}</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.actionsRow}>
        <View style={styles.contactActions}>
          <TouchableOpacity style={styles.circleButton}>
            <AppIcon name="phone" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <AppIcon name="message" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonLabel}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaitingDriverStep;

const styles = StyleSheet.create({
  container: {},
  etaText: {
    fontSize: 23,
    color: "#5A5A5A",
    fontWeight: "500",
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  driverAvatar: {
    aspectRatio: 1,
    height: 60,
    borderRadius: 4,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 23,
    fontWeight: "600",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  mutedText: {
    color: "#A0A0A0",
  },
  carImage: {
    height: 55,
    aspectRatio: 101 / 59,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentLabel: {
    fontSize: 23,
    color: "#5A5A5A",
    fontWeight: "600",
  },
  paymentValue: {
    fontSize: 26,
    fontWeight: "700",
  },
  spacer: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    height: 50,
    paddingHorizontal: 50,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cancelButtonLabel: {
    fontSize: 23,
    color: "white",
    fontWeight: "600",
  },
});
