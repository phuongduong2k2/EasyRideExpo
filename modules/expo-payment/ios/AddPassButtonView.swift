//
//  ExpoPaymentAddPassButton.swift
//  ExpoPayment
//
//  Created by Phuong Duong on 5/11/26.
//

import ExpoModulesCore
import PassKit
import UIKit

class AddPassButtonView: ExpoView {
    let addPassBtn = PKAddPassButton()
    let network = Network()
    
    let onDone = EventDispatcher()
    let onFailed = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        addSubview(addPassBtn)
        
        addPassBtn.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addPassBtn.frame = self.bounds
        
        addPassBtn.addTarget(self, action: #selector(addPass), for: .touchUpInside)
    }
    
    @objc private func addPass() {
        Task {
            do {
                guard let data = try await network.fetchLoyaltyPass() else {
                    return onFailed([
                        "message": "Bad data"
                    ])
                }
                
                let pkPass = try PKPass(data: data)
                
                await MainActor.run {
                    guard let currentVC = self.appContext?.utilities?.currentViewController() else {
                        return onFailed([
                            "message": "Current VC not found"
                        ])
                    }
                    
                    guard let addPassVC = PKAddPassesViewController(pass: pkPass) else {
                        return onFailed([
                            "message": "Create add pass VC failed"
                        ])
                    }
                    
                    currentVC.present(addPassVC, animated: true)
                    onDone([
                        "message": "Done"
                    ])
                }
            } catch {
                onFailed([
                    "message": error.localizedDescription
                ])
            }
        }
    }
}
