import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { ticketPath } from "../config/pathConfig"
import axios from "axios"

export const fetchTicketByTicketId = createAsyncThunk(
  "fetchTicketById",
  async (ticketId) =>{
    try {
      const response = await axios.get(`${ticketPath}/${ticketId}`);
      return {
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      console.error(error);
    }
  }
)

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
    });

const initialState ={
    ticket:[],
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
          .addCase(fetchTicketByTicketId.fulfilled,(state,action) => {
            const response = action.payload;
    
            if (response?.statusCode) {
              const { statusCode, data } = response;
    
              if (statusCode === 200) {
                state.ticket = data;
                state.status = "success";
              }
    
              if (statusCode === 404) {
                state.status = "failed";
                state.error = String(data);
              }
            } else {
              console.log("error occured in fetchTicketById");
            }
          })
    }
})

export default ticketSlice.reducer;
export const getAllCity = (state) => state.tickets.cities;
export const getAllTickets = (state) => state.tickets.tickets;
export const getStatus = (state) => state.tickets.status;
export const getError = (state) => state.tickets.error;
export const getTicket = (state) => state.tickets.ticket
