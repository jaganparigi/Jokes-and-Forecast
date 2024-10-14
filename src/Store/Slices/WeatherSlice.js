import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostName, appId } from "../../components/config";

export const getCityData = createAsyncThunk("city", async (obj) => {
  try {
    const req = await axios.get(
      `${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&appid=${appId}`
    );
    const res = await req.data;
    return {
      data: res,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.res.data.message,
    };
  }
});

export const get5dayForecast = createAsyncThunk("5days", async (obj) => {
  const req = await axios.get(
    `${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&appid=${appId}`
  );
  const res = await req.data;
  return res;
});

const WeatherSlice = createSlice({
  name: "weather",
  initialState: {
    citySearchLoading: false,
    citySearchData: null,
    forecastLoading: false,
    forecastData: null,
    forecastError: null,
  },
  extraReducers: (builders) => {
    builders
      //city
      .addCase(getCityData.pending, (state) => {
        state.citySearchLoading = true;
        state.citySearchData = null;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = action.payload;
      })
      //5 day forecast
      .addCase(get5dayForecast.pending, (state) => {
        state.forecastLoading = true;
        (state.forecastData = null), (state.forecastError = null);
      })
      .addCase(get5dayForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
        state.forecastError = null;
      })
      .addCase(get5dayForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = null;
        state.forecastError = action.error.message;
      });
  },
});

export default WeatherSlice.reducer;
