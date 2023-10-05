import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { orderPath } from "../config/pathConfig"

export const fetchOrdersByTicketId = createAsyncThunk(
    "fetchOrdersByTicketId",
    async (ticketId) => {
        try {
        const response = await axios.get(`${orderPath}/${ticketId}`)
        return {
            statusCode: response.status,
            data: response.data
        }
    }catch (error) {
        console.error(error);
      }
    }
)

const initialState = {
    orders : [],
    status : 'idle',
    error : null
}

const orderSlice = createSlice({
    name : "orderSlice",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchOrdersByTicketId.fulfilled, (state, action) => {
            const response = action.payload;
    
            if (response?.statusCode) {
              const { statusCode, data } = response;
    
              if (statusCode === 200) {
                state.orders = [...data];
                state.status = "success";
              }
    
              if (statusCode === 404) {
                state.status = "failed";
                state.error = String(data);
              }
            } else {
              console.log("error occured in fetchOrdersByTicketId");
            }
          })
    }
})

export default orderSlice.reducer;