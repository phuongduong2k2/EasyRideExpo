import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";

import { RootStackParamList } from "./types";
import { Onboarding, Authentication } from "../screens";


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name={"Onboarding"}
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Authentication"}
        component={Authentication}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BottomTab"}
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
