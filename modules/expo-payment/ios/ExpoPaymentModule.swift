import ExpoModulesCore
import PassKit

public class ExpoPaymentModule: Module {
    private let addPassDelegateHandler = AddPassDelegateHandler()
    private let network = Network()
    private let pkPassLib = PKPassLibrary()
    
    private func getCurrentVC() -> UIViewController? {
        return self.appContext?.utilities?.currentViewController()
    }
    
    public func definition() -> ModuleDefinition {
        Name("ExpoPayment")
        
        Events("addPassDidFinish")
        
        AsyncFunction("displayPass") {() -> Void in
            guard let data = try await network.fetchLoyaltyPass() else {
                throw Exception(name: "FETCH_FAILED", description: "Fetch pk pass failed")
            }
            
            let pkPass = try PKPass(data: data)
            print("withPassTypeIdentifier: \(pkPass.passTypeIdentifier),serialNumber: \(pkPass.serialNumber)")

            return try await MainActor.run {
                guard let currentVC = self.getCurrentVC(),
                      let addPassVC = PKAddPassesViewController(pass: pkPass) else {
                    throw Exception(name: "PRESENT_FAILED", description: "Something wrong")
                }
                
                self.addPassDelegateHandler.pkPass = pkPass
                self.addPassDelegateHandler.onFinish = { status in
                    self.sendEvent("addPassDidFinish", [
                        "status": status
                    ])
                }
                addPassVC.delegate = self.addPassDelegateHandler
                
                addPassVC.view.backgroundColor = .systemBackground
                currentVC.present(addPassVC, animated: true)
            }
        }
        
        View(AddPassButtonView.self) {
            Events("onButtonPress")
        }
        
        View(PaymentButton.self) {
            Events("onButtonPress")
        }
        
        Function("isPassExist") {() -> Bool in
            let passes = pkPassLib.passes()
            print(passes)
            guard let _ = pkPassLib.pass(withPassTypeIdentifier: "pass.com.apple.devpubs.example", serialNumber: "p69f2J") else {
                return false
            }
            return true
        }
        
        AsyncFunction("setupPayment") {() -> Void in
            return await MainActor.run {
                guard let currentVC = self.getCurrentVC() else {
                    return
                }
                let cookieItem = PKPaymentSummaryItem(label: "cookie", amount: 100)
                let milkItem = PKPaymentSummaryItem(label: "milk", amount: 120)
                let paymentRequest = PKPaymentRequest()
                paymentRequest.countryCode = "VN"
                paymentRequest.currencyCode = "VND"
                paymentRequest.merchantIdentifier = "merchaint"
                paymentRequest.paymentSummaryItems = [cookieItem, milkItem]
                paymentRequest.supportedNetworks = [.visa,.masterCard]
                guard let paymentVC = PKPaymentAuthorizationViewController(paymentRequest: paymentRequest) else {
                    return
                }
                
                currentVC.present(paymentVC, animated: true)
            }
        }
    }
}
