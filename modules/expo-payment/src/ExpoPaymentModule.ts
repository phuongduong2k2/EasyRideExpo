import { NativeModule, requireNativeModule } from "expo";

export type PassEvents = {
  addPassDidFinish: (params: { status: boolean }) => void;
};
declare class ExpoPaymentModule extends NativeModule<PassEvents> {
  displayPass(): Promise<string>;
  addPassDidFinish(event: { status: boolean }): void;
  isPassExist(): boolean;
  setupPayment(): Promise<void>;
}

export default requireNativeModule<ExpoPaymentModule>("ExpoPayment");
