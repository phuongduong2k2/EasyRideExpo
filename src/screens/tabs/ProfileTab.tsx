import { Button, Text, View } from "react-native";

import { useEffect } from "react";
import ExpoPaymentModule from "../../../modules/expo-payment/src/ExpoPaymentModule";
import NativeAddPassButton from "../../../modules/expo-payment/src/NativeAddPassButton";

type Props = {};

const ProfileTab = (props: Props) => {
  useEffect(() => {
    const subscription = ExpoPaymentModule.addListener(
      "addPassDidFinish",
      ({ status }) => {
        console.log("Expo: ", status);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProfileTab {String(ExpoPaymentModule.isPassExist())}</Text>

      <NativeAddPassButton
        style={{
          width: 285,
          height: 43,
        }}
        onButtonPress={async () => {
          try {
            await ExpoPaymentModule.displayPass();
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <Button
        title="test"
        onPress={() => console.log(ExpoPaymentModule.isPassExist())}
      />
    </View>
  );
};

export default ProfileTab;
