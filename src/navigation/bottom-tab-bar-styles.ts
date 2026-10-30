import { StyleSheet } from "react-native";

export const ACTIVE_COLOR = "#FEC400";
export const INACTIVE_COLOR = "#414141";

export const BAR_HEIGHT = 83;
export const HEXAGON_SIZE = 90;

export const bottomTabBarStyles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    position:'absolute',
    bottom:0,
    left:0,
  },
  panel: {
    height: BAR_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 23,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },
  tabLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
  walletTabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap:4
  },
  walletHexagon: {
    top: -HEXAGON_SIZE/2 - 24 ,
    width: HEXAGON_SIZE,
    height: HEXAGON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  walletLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    lineHeight: 18,
  },
});
