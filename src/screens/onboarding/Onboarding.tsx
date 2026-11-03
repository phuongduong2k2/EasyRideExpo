import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../assets/colors";
import { DIMENTIONS } from "../../constants";
import { StackNavigationProp } from "../../navigation/types";
import { ONBOARDING_SLIDES, OnboardingSlide } from "./onboarding-slides";

type Props = StackNavigationProp<"Onboarding">;

const Onboarding = ({ navigation }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / DIMENTIONS.width,
    );
    setActiveIndex(index);
  };

  const goToAuthentication = () => {
    navigation.replace("Authentication");
  };

  const handleNext = () => {
    if (isLastSlide) {
      goToAuthentication();
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleSkip = () => {
    goToAuthentication();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable onPress={handleSkip} hitSlop={8}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: DIMENTIONS.width,
            offset: DIMENTIONS.width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width: DIMENTIONS.width }]}>
              <Image
                source={item.image}
                style={styles.illustration}
                contentFit="contain"
              />
              <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <View
                key={slide.id}
                style={[styles.dot, index === activeIndex && styles.dotActive]}
              />
            ))}
          </View>

          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.nextButtonPressed,
            ]}
          >
            {isLastSlide ? (
              <Text style={styles.goText}>Go</Text>
            ) : (
              <View style={styles.chevronRight} />
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  skipText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.textSecondary,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 48,
  },
  illustration: {
    width: "93%",
    height: "45%",
    marginBottom: 32,
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
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.textPlaceholder,
    textAlign: "center",
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentLight,
  },
  dotActive: {
    width: 20,
    backgroundColor: COLORS.accent,
  },
  nextButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonPressed: {
    opacity: 0.85,
  },
  chevronRight: {
    width: 12,
    height: 12,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: COLORS.textTertiary,
    transform: [{ rotate: "45deg" }],
    marginLeft: -2,
  },
  goText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    letterSpacing: 0.3,
    color: COLORS.textTertiary,
  },
});
