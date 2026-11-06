import { requireNativeView } from "expo";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
};

const NativeView: React.ComponentType<Props> = requireNativeView(
  "ExpoPayment",
  "PaymentButton",
);

function PaymentButton(props: Props) {
  return <NativeView {...props} />;
}

export default PaymentButton;
