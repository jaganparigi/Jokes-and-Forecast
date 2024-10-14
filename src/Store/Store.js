import { configureStore } from "@reduxjs/toolkit";
import user from "./Slices/UserSlice";
import weatherReducer from "../Store/Slices/WeatherSlice";

const store = configureStore({
  reducer: {
    user: user,
    weather: weatherReducer,
  },
});

export default store;
