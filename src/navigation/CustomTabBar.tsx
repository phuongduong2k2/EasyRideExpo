import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconName } from "../assets/icons";
import AppIcon from "../components/AppIcon";
import {
  ACTIVE_COLOR,
  INACTIVE_COLOR,
  bottomTabBarStyles as styles,
} from "./bottom-tab-bar-styles";
import { BottomTabParamList } from "./types";

type TabIcons = {
  outline: IconName;
  fill: IconName;
};

const TAB_ICONS: Record<keyof BottomTabParamList, TabIcons> = {
  Home: { outline: "house", fill: "house_fill" },
  Favourite: { outline: "heart", fill: "heart_fill" },
  Wallet: { outline: "wallet", fill: "wallet" },
  Offer: { outline: "discount", fill: "discount_fill" },
  Profile: { outline: "user", fill: "user_fill" },
};

const {width: SCREEN_WIDTH} = Dimensions.get('window')

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {width: SCREEN_WIDTH}]}>
      <View style={[styles.panel, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const name = route.name as keyof BottomTabParamList;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : (options.title ?? name);
          const isFocused = state.index === index;
          const icons = TAB_ICONS[name];

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (name === "Wallet") {
            return (
              <Pressable
                key={route.key}
                onPress={handlePress}
                style={styles.walletTabItem}
              >
                <View style={{ height: 24 }}>
                  <View style={styles.walletHexagon}>
                    <AppIcon name="hexagon" />
                    <View style={{ position: "absolute" }}>
                      <AppIcon name={icons.outline}/>
                    </View>
                  </View>
                </View>
                <Text
                  style={[
                    styles.walletLabel,
                    { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              style={styles.tabItem}
            >
              <AppIcon
                name={isFocused ? icons.fill : icons.outline}
                width={24}
                height={24}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
