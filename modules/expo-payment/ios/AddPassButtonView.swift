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
    
    let onButtonPress = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        addSubview(addPassBtn)
        
        addPassBtn.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        addPassBtn.frame = self.bounds
        
        addPassBtn.addTarget(self, action: #selector(addPass), for: .touchUpInside)
    }
    
    @objc private func addPass() {
        onButtonPress()
    }
}
