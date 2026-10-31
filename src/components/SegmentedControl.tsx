import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../assets/colors";

type Props = {
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const SegmentedControl = ({ onLeftPress, onRightPress }: Props) => {
  const width = useSharedValue(0);
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(animatedValue.value, [0, 1], [0, width.value]),
      },
    ],
  }));

  const animatedLeftText = useAnimatedStyle(() => ({
    color: interpolateColor(animatedValue.value, [1, 0], ["black", "white"]),
  }));

  const animatedRightText = useAnimatedStyle(() => ({
    color: interpolateColor(animatedValue.value, [0, 1], ["black", "white"]),
  }));

  const handleLeftPress = () => {
    animatedValue.value = withTiming(0);
    onLeftPress?.();
  };

  const handleRightPress = () => {
    animatedValue.value = withTiming(1);
    onRightPress?.();
  };

  return (
    <View
      style={styles.tabsCard}
      onLayout={(event) => {
        if (!width.value) {
          width.value = event.nativeEvent.layout.width / 2;
        }
      }}
    >
      <Animated.View style={[styles.indicator, animatedStyle]} />
      <Pressable style={[styles.tabItem]} onPress={handleLeftPress}>
        <Animated.Text style={[styles.tabLabel, animatedLeftText]}>
          Transport
        </Animated.Text>
      </Pressable>
      <Pressable style={[styles.tabItem]} onPress={handleRightPress}>
        <Animated.Text style={[styles.tabLabel, animatedRightText]}>
          Delivery
        </Animated.Text>
      </Pressable>
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  indicator: {
    height: "100%",
    backgroundColor: COLORS.accent,
    width: "50%",
    position: "absolute",
  },
  tabsCard: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    flexDirection: "row",
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    backgroundColor: COLORS.primary,
  },
  tabLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.textSecondary,
  },
  tabLabelActive: {
    color: COLORS.white,
  },
});
