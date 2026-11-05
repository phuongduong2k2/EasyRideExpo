import { NativeModule, requireNativeModule } from "expo";

declare class ExpoPaymentModule extends NativeModule {
  presentSheet(): Promise<void>;
}

export default requireNativeModule<ExpoPaymentModule>("ExpoPayment");
