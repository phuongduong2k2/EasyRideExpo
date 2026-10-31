import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import Animated, {
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";

const UserMarker = () => {
  const { currentCoordinates } = useCurrentLocation();
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, {
        duration: 2000,
      }),
      -1,
      true,
      () => {},
      ReduceMotion.System,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(animatedValue.value, [0, 1], [1, 0.5]) }],
  }));

  return (
    currentCoordinates && (
      <Marker
        coordinate={{
          ...currentCoordinates,
        }}
      >
        <View style={styles.indicatorContainer}>
          <Animated.View style={[styles.indicator, animatedStyle]} />
        </View>
      </Marker>
    )
  );
};

export default UserMarker;

const styles = StyleSheet.create({
  indicatorContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 2.5,
  },
  indicator: {
    backgroundColor: "#157edb",
    height: 15,
    aspectRatio: 1,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 100,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
