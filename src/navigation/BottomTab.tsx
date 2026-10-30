import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CustomTabBar from "./CustomTabBar";
import FavouriteTab from "./tabs/FavouriteTab";
import HomeTab from "./tabs/HomeTab";
import OfferTab from "./tabs/OfferTab";
import ProfileTab from "./tabs/ProfileTab";
import WalletTab from "./tabs/WalletTab";
import { BottomTabParamList } from "./types";

type TabConfig = {
  name: keyof BottomTabParamList;
  component: (props: any) => React.ReactNode;
};

const TABS: TabConfig[] = [
  { name: "Home", component: HomeTab },
  { name: "Favourite", component: FavouriteTab },
  { name: "Wallet", component: WalletTab },
  { name: "Offer", component: OfferTab },
  { name: "Profile", component: ProfileTab },
];

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      // screenOptions={{ headerShown: false }}
    >
      {TABS.map(({ name, component }, index) => (
        <Tab.Screen
          key={`${name}-${index}`}
          name={name}
          component={component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;
