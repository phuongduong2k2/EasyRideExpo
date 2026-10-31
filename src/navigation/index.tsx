import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";

import { Authentication, Onboarding } from "../screens";
import MapScreen from "../screens/map/MapScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"Onboarding"} component={Onboarding} />
      <Stack.Screen name={"Authentication"} component={Authentication} />
      <Stack.Screen name={"BottomTab"} component={BottomTab} />
      <Stack.Screen name={"Map"} component={MapScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
