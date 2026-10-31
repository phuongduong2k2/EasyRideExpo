import { Image } from "expo-image";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../assets/colors";
import AppButton from "../../AppButton";
import AppIcon from "../../AppIcon";
import { CARS } from "./mock-data";
import { Car } from "./types";

const heightScreen = Dimensions.get("window").height;

const ItemSeparatorComponent = () => <View style={styles.separator} />;

type Props = {
  insets: EdgeInsets;
  selectedCar: Car | null;
  isFetchingDriver: boolean;
  onSelectCar: (car: Car) => void;
  onBookNow: () => void;
};

const SelectVehicleStep = ({
  insets,
  selectedCar,
  isFetchingDriver,
  onSelectCar,
  onBookNow,
}: Props) => {
  return (
    <View style={[styles.container, { height: heightScreen * 0.5 - insets.top }]}>
      <FlatList
        data={CARS}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectCar(item)}
            activeOpacity={1}
            style={[
              styles.carItem,
              {
                borderColor:
                  item.key === selectedCar?.key ? COLORS.accent : "transparent",
              },
            ]}
          >
            <View style={styles.carInfo}>
              <Text>{item.name}</Text>
              <Text>{item.type.join(" | ")}</Text>
              <View style={styles.carDistanceRow}>
                <AppIcon name="map" />
                <Text>{item.description}</Text>
              </View>
            </View>
            <Image
              source={item.image}
              contentFit="contain"
              style={styles.carImage}
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.bookButtonContainer}>
        <AppButton
          disabled={!selectedCar || isFetchingDriver}
          onPress={onBookNow}
          isLoading={isFetchingDriver}
        >
          <Text style={styles.bookButtonLabel}>Book Now</Text>
        </AppButton>
      </View>
    </View>
  );
};

export default SelectVehicleStep;

const styles = StyleSheet.create({
  container: {},
  separator: {
    height: 20,
  },
  carItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  carInfo: {
    gap: 5,
  },
  carDistanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    height: 55,
    aspectRatio: 101 / 59,
  },
  bookButtonContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
