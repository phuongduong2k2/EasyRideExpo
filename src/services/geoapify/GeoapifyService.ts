import { LatLng } from "react-native-maps";
import { ApiService } from "../ApiService";
import {
  ReverseGeocodingResponse,
  RoutingParams,
  RoutingResponse,
} from "./types";

const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1/geocode";

class GeoapifyService extends ApiService {
  private readonly apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
  constructor() {
    super(GEOAPIFY_BASE_URL);
  }

  public getReverseGeocoding({ latitude, longitude }: LatLng) {
    return this.get<ReverseGeocodingResponse>({
      endpoint: "/reverse",
      params: {
        lat: latitude,
        lon: longitude,
        apiKey: this.apiKey,
      },
    });
  }

  public getRouting({ from, to }: RoutingParams) {
    const waypoints = [from, to]
      .map((location) => `${location.latitude},${location.longitude}`)
      .join("|");

    return this.get<RoutingResponse>({
      endpoint: "/routing",
      params: {
        waypoints,
      },
    });
  }
}

export const geoapifyService = new GeoapifyService();
