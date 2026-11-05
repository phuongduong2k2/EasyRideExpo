import { Button, Text, View } from "react-native";

import ExpoPaymentModule from "../../../modules/expo-payment/src/ExpoPaymentModule";
import NativeAddPassButton from "../../../modules/expo-payment/src/NativeAddPassButton";

type Props = {};

const ProfileTab = (props: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ProfileTab</Text>
      <Button
        title="Add Card"
        onPress={() =>
          ExpoPaymentModule.presentSheet().then(() => console.log("done"))
        }
      />
      <NativeAddPassButton
        style={{
          width: 285, // Chiều rộng tiêu chuẩn Apple khuyên dùng
          height: 43, // Chiều cao tiêu chuẩn
        }}
        onDone={(event) => console.log(event.nativeEvent.message)}
        onFailed={(event) => console.log(event.nativeEvent.message)}
      />
    </View>
  );
};

export default ProfileTab;
