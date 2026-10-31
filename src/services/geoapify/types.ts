import { LatLng } from "react-native-maps";

export interface GeoapifyResponse<T> {
  type: string;
  features: [T];
  query: {
    lat: number;
    lon: number;
    plus_code: string;
  };
}

export type ReverseGeocodingResponse = GeoapifyResponse<{
  type: string;
  properties: {
    name: string;
    country: string;
    country_code: string;
    city: string;
    postcode: string;
    suburb: string;
    street: string;
    county: string;
    state: string;
    state_code: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
  };
}>;

export type RoutingParams = {
  from: LatLng;
  to: LatLng;
};

export type RoutingResponse = GeoapifyResponse<{
  type: string;
  properties: {
    mode: string;
    waypoints: { location: [number, number] }[];
    units: string;
    distance: number;
    distance_units: string;
    time: number;
    legs: {
      distance: number;
      time: number;
      steps: {
        from_index: number;
        to_index: number;
        distance: number;
        time: number;
        instruction: {
          text: string;
        };
      }[];
    }[];
  };
  geometry: {
    type: string;
    coordinates: [[[number, number]]];
  };
}>;
