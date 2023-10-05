import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ticketPath } from "../config/pathConfig";
import axios from "axios";

export const fetchAllTickets = createAsyncThunk(
    "fetchAllTickets",
    async () => {
      try {
        const response = await axios.get(`${ticketPath}/all`);
        return {
          statusCode: response.status,
          data: response.data,
        };
      } catch (error) {
        console.error(error);
      }
    }
  );

  const initialState = {
    tickets: [],
    status: "idle",
    error: null
  };

  const ticketSlice = createSlice({
    name: "ticketSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchAllTickets.fulfilled, (state, action) => {
          const response = action.payload;
  
          if (response?.statusCode) {
            const { statusCode, data } = response;
  
            if (statusCode === 200) {
              state.tickets = [...data];
              state.status = "success";
            }
  
            if (statusCode === 404) {
              state.status = "failed";
              state.error = String(data);
            }
          } else {
            console.log("error occured in fetchAllTickets");
          }
        })
        .addCase(fetchAllTickets.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAllTickets.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
    }
})

export default ticketSlice.reducer;
export const getAllTickets = (state) => state.tickets.tickets
export const getStatus = (state) => state.tickets.status;
export const getError = (state) => state.tickets.error;
