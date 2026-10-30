import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { ICONS } from "./assets/icons";
import { IMAGES } from "./assets/images";
import RootNavigation from "./navigation";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
  ...Object.values(IMAGES),
  // ...Object.values(ICONS),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={theme} onReady={() => SplashScreen.hideAsync()}>
      <RootNavigation />
    </NavigationContainer>
  );
}
