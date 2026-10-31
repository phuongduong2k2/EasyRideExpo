import { Image } from "expo-image";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import { COLORS } from "../../assets/colors";
import { IMAGES } from "../../assets/images";
import AppIcon from "../../components/AppIcon";
import { StackNavigationProp } from "../../navigation/types";

type Props = StackNavigationProp<"Authentication">;

const Authentication = ({ navigation }: Props) => {
  const handleGoogleSignIn = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      Alert.alert(
        "Request permission failed",
        "Permission to access location was denied",
      );
      return;
    }
    navigation.replace("BottomTab", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.illustrationWrap}>
          <Image
            source={IMAGES.welcome}
            style={styles.illustration}
            contentFit="contain"
          />
          <View style={styles.textBlock}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>
              Have a better sharing experience
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            onPress={handleGoogleSignIn}
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.googleButtonPressed,
            ]}
          >
            <AppIcon name="gmail" width={20} height={20} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  illustrationWrap: {
    alignItems: "center",
    marginTop: 48,
  },
  illustration: {
    width: "91%",
    height: 220,
  },
  textBlock: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 28,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    lineHeight: 30,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textPlaceholder,
    textAlign: "center",
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  googleButtonPressed: {
    opacity: 0.85,
  },
  googleButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.white,
  },
});
