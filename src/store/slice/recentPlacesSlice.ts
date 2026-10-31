import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RecentPlace = string;

interface RecentPlacesState {
  places: RecentPlace[];
}

const initialState: RecentPlacesState = {
  places: ["Office", "Coffee shop", "Shopping center", "Shopping mall"],
};

export const recentPlacesSlice = createSlice({
  name: "recentPlaces",
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<RecentPlace>) => {
      state.places.push(action.payload);
    },
    removePlace: (state, action: PayloadAction<RecentPlace>) => {
      state.places = state.places.filter((place) => place !== action.payload);
    },
  },
});

export const RecentPlaceActions = {
  ...recentPlacesSlice.actions,
};

export const recentPlaceReducer = recentPlacesSlice.reducer;
