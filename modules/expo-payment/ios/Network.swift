//
//  Network.swift
//  ExpoPayment
//
//  Created by Phuong Duong on 5/11/26.
//

import Foundation

class Network {
    func fetchLoyaltyPass() async throws -> Data? {
        guard let url = URL(string: "http://localhost:3000/api/download") else {
            return nil
        }
        let (data, response) = try await URLSession.shared.data(from: url)
        
        guard let response = response as? HTTPURLResponse, response.statusCode == 200 else {
            return nil
        }
        
        return data
    }
}
