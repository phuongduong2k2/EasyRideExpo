import { ApiService } from "../ApiService";
import { MAPBOX_BASE_URL, MAPBOX_ENDPOINTS } from "./config";

class MapboxApiService extends ApiService {
  constructor() {
    super(MAPBOX_BASE_URL);
  }

  public async searchAddress(searchText: string) {
    return this.get({
      endpoint: MAPBOX_ENDPOINTS.SEACH,
      params: {
        q: searchText,
      },
    });
  }
}

export const mapboxApiService = new MapboxApiService();
