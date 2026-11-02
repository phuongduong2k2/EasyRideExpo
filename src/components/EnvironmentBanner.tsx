import { StyleSheet, Text, View } from "react-native";
import config from "../config";

const bannerConfig = {
  development: { color: "#FFD700", textColor: "#000", label: "DEVELOPMENT" },
  preview: { color: "#FF8C00", textColor: "#fff", label: "STAGING" },
  production: null, // No banner in production
};

export function EnvironmentBanner() {
  const banner = bannerConfig[config.env];
  if (!banner) return null; // Production - render nothing
  return (
    <View style={[styles.banner, { backgroundColor: banner.color }]}>
      <Text style={[styles.text, { color: banner.textColor }]}>
        {banner.label} - {config.geoapifyApiKey}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  banner: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
