import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
    Home: undefined
    Favourite: undefined
    Wallet: undefined
    Offer: undefined
    Profile: undefined
}

export type RootStackParamList = {
    Onboarding: undefined
    Authentication: undefined
    BottomTab: NavigatorScreenParams<BottomTabParamList>
}

export type StackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
