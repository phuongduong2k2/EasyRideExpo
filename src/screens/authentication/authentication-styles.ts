import { StyleSheet } from "react-native";

export const PRIMARY_COLOR = "#EDAE10";

export const authenticationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    color: "#2A2A2A",
    textAlign: "center",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#A0A0A0",
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
    backgroundColor: PRIMARY_COLOR,
  },
  googleButtonPressed: {
    opacity: 0.85,
  },
  googleButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: "#FFFFFF",
  },
});
