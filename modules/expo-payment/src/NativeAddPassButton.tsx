import { requireNativeView } from "expo";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type Props = {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
};

const NativeView: React.ComponentType<Props> = requireNativeView("ExpoPayment");

const NativeAddPassButton = (props: Props) => {
  return <NativeView {...props} />;
};

export default NativeAddPassButton;
