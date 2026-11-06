//
//  PaymentButton.swift
//  ExpoPayment
//
//  Created by Phuong Duong on 6/11/26.
//

import ExpoModulesCore
import PassKit

class PaymentButton: ExpoView {
    let pkPaymentBtn = PKPaymentButton()
    
    let onButtonPress = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        
        self.addSubview(pkPaymentBtn)
        pkPaymentBtn.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        pkPaymentBtn.frame = self.bounds
        
        pkPaymentBtn.addTarget(self, action: #selector(onPress), for: .touchUpInside)
    }
    
    @objc
    private func onPress() {
        onButtonPress()
    }
}
