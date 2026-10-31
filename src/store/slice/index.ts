import { combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { recentPlaceReducer } from "./recentPlacesSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  recentPlaces: recentPlaceReducer,
});
