package expo.modules.payment

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPaymentModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoPayment")
  }
}
