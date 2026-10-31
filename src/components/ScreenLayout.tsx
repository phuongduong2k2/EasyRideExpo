import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppIcon from "./AppIcon";

type Props = {
  children: React.ReactNode;
  title?: string;
  isUseSafeArea?: boolean;
};

const ScreenLayout = ({ children, title, isUseSafeArea = true }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View
      style={{
        paddingTop: isUseSafeArea ? insets.top : 0,
        paddingBottom: isUseSafeArea ? insets.bottom : 0,
        flex: 1,
      }}
    >
      <View
        style={[
          {
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            zIndex: 100,
          },
          !isUseSafeArea
            ? {
                position: "absolute",
                top: insets.top,
                left: 0,
                width: "100%",
              }
            : {},
        ]}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 5,
            }}
            onPress={handleGoBack}
          >
            <AppIcon name="arrow_left" />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            flex: 2,
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf: "center",
            fontSize: 25,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default ScreenLayout;
