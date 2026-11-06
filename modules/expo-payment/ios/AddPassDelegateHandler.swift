//
//  AddPassDelegateHandler.swift
//  ExpoPayment
//
//  Created by Phuong Duong on 6/11/26.
//

import PassKit
import UIKit

class AddPassDelegateHandler: NSObject, PKAddPassesViewControllerDelegate {
    
    var pkPass: PKPass!
    
    var onFinish: ((Bool) -> Void)?
    func addPassesViewControllerDidFinish(_ controller: PKAddPassesViewController) {
        let pkPassLib = PKPassLibrary()
        controller.dismiss(animated: true) {
            self.onFinish?(pkPassLib.containsPass(self.pkPass))
        }
    }
}
