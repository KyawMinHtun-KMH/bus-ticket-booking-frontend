import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { ticketPath } from "../config/pathConfig"
import axios from "axios"


export const fetchAllTicketByRoute = createAsyncThunk("fetchAllTicketByRoute", async (RouteAndDepatureRequest) => {
    try {
      const response = await axios.get(`${ticketPath}/searchticket`,RouteAndDepatureRequest,{
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      return {
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      console.error(error);
    }
  });

  export const fetchAllCity = createAsyncThunk("fetchAllCity", async () => {
      try {
        const response = await axios.get(`${ticketPath}/city`);
        return {
          statusCode: response.status,
          data: response.data
        };
      } catch (error) {
        console.error(error);
      }
    });

const initialState ={
    tickets : [],
    cities : [],
    status : "idle",
    error : null
}

const ticketSlice = createSlice({
    name : "ticketSlice",
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
        .addCase(fetchAllTicketByRoute.fulfilled,(state,action)=>{
            const response = action.payload;
            if (response?.statusCode) {
              const { statusCode, data } = response;
              if (statusCode === 200) {
                state.tickets = [...data];
                state.status = "success"
              }
            }else {
                console.log("error occured in fetchAllTicket");
              }
            })
            .addCase(fetchAllTicketByRoute.pending, (state) => {
              state.status = "loading";
            })
            .addCase(fetchAllTicketByRoute.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.payload;
            })
          .addCase(fetchAllCity.fulfilled,(state,action)=>{
            const response = action.payload;
            if(response?.statusCode){
                const { statusCode, data }=response;
                if(statusCode === 200){
                  state.cities = [...data]
                }
            }else{
              console.log("error occured in fetchAllCity")
            }
          })
    }
})



export default ticketSlice.reducer
export const getAllCity = (state) =>[...state.tickets.cities]
export const getAllTicket = (state) =>state.tickets.tickets