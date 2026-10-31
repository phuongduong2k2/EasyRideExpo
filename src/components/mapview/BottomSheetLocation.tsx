import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image, ImageSource } from "expo-image";
import { fetchAsync } from "expo/src/async-require/fetchAsync.native.ts";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LatLng } from "react-native-maps";
import Animated, {
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../assets/colors";
import { IMAGES } from "../../assets/images";
import { geoapifyService } from "../../services/geoapify/GeoapifyService";
import { getRandomArbitrary } from "../../utils/utils";
import AppButton from "../AppButton";
import AppIcon from "../AppIcon";
import BreakLine from "../BreakLine";

type Props = {
  ref?: React.RefObject<BottomSheetModal | null>;
  selectedLocation: LatLng | null;
  onSelectWaypoint?: () => void;
  onGoToUser?: () => void;
  onCancel?: () => void;
};

const ItemSeparatorComponent = () => <View style={{ height: 20 }} />;

const DATA = {
  datasource: {
    sourcename: "openstreetmap",
    attribution: "© OpenStreetMap contributors",
    license: "Open Database License",
    url: "https://www.openstreetmap.org/copyright",
  },
  name: "Sân vận động quốc gia Mỹ Đình",
  country: "Vietnam",
  country_code: "vn",
  city: "Hà Nội",
  postcode: "12016",
  suburb: "Xuân Phong",
  street: "Đường Lê Đức Thọ",
  iso3166_2: "VN-HN",
  lon: 105.7658668,
  lat: 21.0197682,
  county: "Tu Liem",
  state: "Ha Noi",
  state_code: "HI",
  distance: 134.93307106695357,
  result_type: "amenity",
  formatted:
    "Sân vận động quốc gia Mỹ Đình, Đường Lê Đức Thọ, Xuân Phong, Hà Nội, HI 12016, Vietnam",
  address_line1: "Sân vận động quốc gia Mỹ Đình",
  address_line2: "Đường Lê Đức Thọ, Xuân Phong, Hà Nội, HI 12016, Vietnam",
  category: "public_transport.bus",
  timezone: {
    name: "Asia/Bangkok",
    offset_STD: "+07:00",
    offset_DST: "+07:00",
    offset_STD_seconds: 25200,
    offset_DST_seconds: 25200,
  },
  plus_code: "7PH72Q98+W8",
  rank: {
    importance: 0.00007283054856179167,
    popularity: 3.318732052193473,
  },
  place_id:
    "51e6c52ef603715a405934805c870f053540f00103f9011f7a15af02000000c0020192032953c3a26e2076e1baad6e20c491e1bb996e67207175e1bb916320676961204de1bbb920c490c3ac6e68e203246f70656e7374726565746d61703a76656e75653a6e6f64652f3131353237333534393131",
};

enum Step {
  Waypoint = "waypoint",
  SelectVehicle = "select-vehicle",
  WaitingDriver = "waiting-driver",
}

type Car = {
  key: string;
  name: string;
  image: ImageSource;
  price: string;
  description: string;
  type: string[];
};

const CARS: Car[] = [
  {
    key: "1",
    name: "Eco Car",
    image: IMAGES.car,
    price: "100$",
    description: "100m (15mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "2",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "200m (5mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "3",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "600m (7mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "4",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "400m (10mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "5",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "50m (2mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "6",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "90m (12mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "7",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "120m (34mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
];

const heightScreen = Dimensions.get("window").height;

type Driver = {
  gender: "female" | "male";
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

const BottomSheetLocation = ({
  selectedLocation,
  onSelectWaypoint,
  onGoToUser,
  onCancel,
  ref,
}: Props) => {
  const snapPoints = useMemo(() => ["20%", "40%", "50%"], []);
  const [step, setStep] = useState<Step>(Step.Waypoint);
  const insets = useSafeAreaInsets();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isFetchingDriver, setIsFetchingDriver] = useState(false);

  const handleFetchData = async () => {
    if (!selectedLocation) return;
    try {
      const res = await geoapifyService.getReverseGeocoding(selectedLocation);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const clear = () => {
    setStep(Step.Waypoint);
    setSelectedCar(null);
    setDriver(null);
  };

  useEffect(() => {
    clear();
  }, [selectedLocation]);

  const renderStep = () => {
    if (!selectedLocation) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            Please select way point
          </Text>
          <Image
            source={IMAGES.onboard_3}
            contentFit="contain"
            style={{ height: 80, aspectRatio: 351 / 201 }}
          />
        </View>
      );
    }
    switch (step) {
      case Step.Waypoint:
        return (
          <>
            <View>
              <Text style={{ fontWeight: "500" }}>{DATA.formatted}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                ref?.current?.snapToIndex(2);
                setStep(Step.SelectVehicle);
              }}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 20,
                borderRadius: 100,
                backgroundColor: COLORS.primary,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                Select this way point
              </Text>
            </TouchableOpacity>
          </>
        );
      case Step.SelectVehicle:
        return (
          <View
            style={{
              height: heightScreen * 0.5 - insets.top,
            }}
          >
            <FlatList
              data={CARS}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedCar(item)}
                  activeOpacity={1}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor:
                      item.key === selectedCar?.key
                        ? COLORS.accent
                        : "transparent",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <View style={{ gap: 5 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.type.join(" | ")}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AppIcon name="map" />
                      <Text>{item.description}</Text>
                    </View>
                  </View>
                  <Image
                    source={item.image}
                    contentFit="contain"
                    style={{
                      height: 55,
                      aspectRatio: 101 / 59,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                paddingTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppButton
                disabled={!selectedCar || isFetchingDriver}
                onPress={async () => {
                  setIsFetchingDriver(true);
                  try {
                    const randomDriverRes = await fetchAsync(
                      "https://randomuser.me/api",
                    );
                    ref?.current?.snapToIndex(1);
                    setDriver(JSON.parse(randomDriverRes.body).results[0]);
                    setStep(Step.WaitingDriver);
                  } catch (error) {
                    clear();
                  }
                  setIsFetchingDriver(false);
                }}
                isLoading={isFetchingDriver}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "600" }}
                >
                  Book Now
                </Text>
              </AppButton>
            </View>
          </View>
        );

      case Step.WaitingDriver:
        return (
          driver && (
            <View
              style={{
                height: heightScreen * 0.4 - insets.top,
              }}
            >
              <Text
                style={{ fontSize: 23, color: "#5A5A5A", fontWeight: "500" }}
              >
                Your driver is comming in 3:35
              </Text>
              <BreakLine />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{ uri: driver?.picture.large }}
                  contentFit="contain"
                  style={{ aspectRatio: 1, height: 60, borderRadius: 4 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 23, fontWeight: "600" }}>
                    {`${driver.name.first} ${driver.name.last}`}
                  </Text>
                  <Text>Phone number: {driver.phone}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <AppIcon name="map" width={10} />
                    <Text style={{ color: "#A0A0A0" }}>
                      {selectedCar?.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <AppIcon name="small_star" />
                    <Text style={{ color: "#A0A0A0" }}>
                      {getRandomArbitrary(1, 5).toFixed(1)}{" "}
                      {`(${getRandomArbitrary(100, 600).toFixed()}) reviews`}
                    </Text>
                  </View>
                </View>
                <Image
                  source={selectedCar?.image}
                  contentFit="contain"
                  style={{ height: 55, aspectRatio: 101 / 59 }}
                />
              </View>
              <BreakLine />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 23, color: "#5A5A5A", fontWeight: "600" }}
                >
                  Payment
                </Text>
                <Text style={{ fontSize: 26, fontWeight: "700" }}>
                  {selectedCar?.price}
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: COLORS.accent,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppIcon name="phone" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: COLORS.accent,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppIcon name="message" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={onCancel}
                  style={{
                    height: 50,
                    paddingHorizontal: 50,
                    backgroundColor: COLORS.accent,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 23, color: "white", fontWeight: "600" }}
                  >
                    Cancel Ride
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        );
      default:
        break;
    }
  };

  const bottomSheetPosition = useSharedValue(-1000);
  const viewPos = useDerivedValue(() => {
    return bottomSheetPosition.value - 50;
  });
  return (
    <>
      <Animated.View
        style={{
          height: 50,
          position: "absolute",
          top: viewPos,
          right: 20,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          onPress={onGoToUser}
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        backgroundStyle={{
          borderWidth: 1,
          borderColor: COLORS.accent,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <BottomSheetView style={{ paddingHorizontal: 20, flex: 1, gap: 10 }}>
          {renderStep()}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default memo(BottomSheetLocation);
