import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ticketPath } from "../config/pathConfig";

export const fetchSeatsByTicketId = createAsyncThunk(
    "fetchSeatsByTicketId",
    async (ticketId) =>{
      try {
        const response = await axios.get(`${ticketPath}/${ticketId}/ticketSeats`);
        return {
          statusCode: response.status,
          data: response.data
        };
      } catch (error) {
        console.error(error);
      }
    }
  )

  const initialState ={
    seats : [],
    status : "idle",
    error : null
}

const seatSlice = createSlice({
    name : "seatSlice",
    initialState,
    reducers: {
      updateSeatStatus: (state, action) => {
        const { seatNumberArray } = action.payload;      
        state.seats = state.seats.map((seat) => {
          if (seatNumberArray.includes(seat.seat.seatNumber)) {
            return { ...seat, status: false };
          } else {
            return seat; // Return the original seat for non-matching seats
          }
        });
      }
      
    },
    
  
    extraReducers(builder){
        builder
        .addCase(fetchSeatsByTicketId.fulfilled, (state, action) => {
            const response = action.payload;
    
            if (response?.statusCode) {
              const { statusCode, data } = response;
    
              if (statusCode === 200) {
                state.seats = 0
                state.seats = [
                    ...data
                ];
                state.status = "success";
              }
    
              if (statusCode === 404) {
                state.status = "failed";
                state.error = String(data);
              }
            } else {
              console.log("error occured in fetchSeatsByTicketId");
            }
          })
          .addCase(fetchSeatsByTicketId.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchSeatsByTicketId.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
    }
})

export default seatSlice.reducer;
export const getStatus = (state) => state.seats.status;
export const getError = (state) => state.seats.error;
export const getSeats = (state) => state.seats.seats
export const { updateSeatStatus } = seatSlice.actions;