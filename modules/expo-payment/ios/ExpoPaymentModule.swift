import ExpoModulesCore
import PassKit

public class ExpoPaymentModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoPayment")
        
        AsyncFunction("presentSheet") {() -> Void in
            do {
                let network = Network()
                guard let data = try await network.fetchLoyaltyPass() else {
                    return
                }
                let pkPass = try PKPass(data: data)
                
                await MainActor.run {
                    guard let currentVC = self.appContext?.utilities?.currentViewController() else {
                        return
                    }
                    guard let addPassVC = PKAddPassesViewController(pass: pkPass) else {
                        return
                    }
                    
                    addPassVC.view.backgroundColor = .systemBackground
                    
                    currentVC.present(addPassVC, animated: true)
                }
                
            } catch {
                print(error.localizedDescription)
            }
        }
        
        View(AddPassButtonView.self) {
            Events("onDone")
            
            Events("onFailed")
        }
    }
    
    @objc func logWallet() {
        print("add wallet")
    }
    
}
