import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Provider } from "react-redux";
import { IMAGES } from "./assets/images";
import RootNavigation from "./navigation";
import { queryClient } from "./services/queryClient";
import { store } from "./store/store";

Asset.loadAsync([...NavigationAssets, ...Object.values(IMAGES)]);

SplashScreen.preventAutoHideAsync();
configureReanimatedLogger({ level: ReanimatedLogLevel.error, strict: false });

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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <NavigationContainer
              theme={theme}
              onReady={() => SplashScreen.hideAsync()}
            >
              <RootNavigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}
