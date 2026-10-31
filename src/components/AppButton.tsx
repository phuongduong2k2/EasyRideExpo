import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../assets/colors";

type Props = {
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  children: React.ReactNode;
} & Omit<TouchableOpacityProps, "style">;

const AppButton = ({ style, isLoading, children, ...res }: Props) => {
  const isLoadingState = useSharedValue(0);

  const childAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(isLoadingState.value, [0, 1], [0, -50]),
      },
    ],
    opacity: interpolate(isLoadingState.value, [0, 1], [1, 0]),
  }));

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(isLoadingState.value, [0, 1], [50, 0]),
      },
    ],
    opacity: isLoadingState.value,
  }));

  useEffect(() => {
    if (isLoading) {
      isLoadingState.value = withTiming(1);
    } else {
      isLoadingState.value = withTiming(0);
    }
  }, [isLoading]);

  return (
    <Pressable
      style={[
        {
          backgroundColor: COLORS.primary,
          paddingVertical: 20,
          width: "100%",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          opacity: res.disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...res}
    >
      <Animated.View style={childAnimatedStyle}>{children}</Animated.View>
      <Animated.View style={[{ position: "absolute" }, indicatorAnimatedStyle]}>
        <ActivityIndicator size={"small"} color={"white"} />
      </Animated.View>
    </Pressable>
  );
};

export default AppButton;
