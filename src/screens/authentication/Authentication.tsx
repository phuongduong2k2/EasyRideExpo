import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppIcon from "../../components/AppIcon";
import { IMAGES } from "../../assets/images";
import { StackNavigationProp } from "../../navigation/types";
import { authenticationStyles as styles } from "./authentication-styles";

type Props = StackNavigationProp<"Authentication">;

const Authentication = ({ navigation }: Props) => {
  const handleGoogleSignIn = () => {
    navigation.replace("BottomTab", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.illustrationWrap}>
          <Image
            // Bundled image assets resolve to a numeric module id at runtime; cast past the
            // mismatched `ImageSourcePropType` (react-native) vs `ImageSource` (expo-image) typings.
            source={IMAGES.welcome as number}
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
