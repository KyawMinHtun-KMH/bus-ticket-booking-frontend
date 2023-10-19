import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketPath } from "../config/pathConfig";
import axios from "axios";

export const createTicket = createAsyncThunk("createTicket", async (data) => {
  try {
    const response = await axios.post(
      `${ticketPath}/create`,
      data.ticketRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("error occured");
    console.error(error);
  }
});

export const updateTicket = createAsyncThunk("updateTicket", async (data) => {
   try {
    const response = await axios.put(
      `${ticketPath}/update`,
      data.ticketRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("error occured");
    console.error(error);
  }
});



export const fetchTicketByTicketId = createAsyncThunk(
  "fetchTicketById",
  async (ticketId) => {
    try {
      const response = await axios.get(`${ticketPath}/${ticketId}`);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchAllTicketByRoute = createAsyncThunk(
  "fetchAllTicketByRoute",
  async (RouteAndDepatureRequest) => {
    try {
      const response = await axios.post(
        `${ticketPath}/searchticket`,
        RouteAndDepatureRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchAllCity = createAsyncThunk("fetchAllCity", async () => {
  try {
    const response = await axios.get(`${ticketPath}/city`);
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});

export const fetchAllTickets = createAsyncThunk("fetchAllTickets", async () => {
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

export const deleteTicket = createAsyncThunk("deleteTicket", async (data) => {
  try {
    const response = await axios.delete(
      `${ticketPath}/delete/${data.ticketId}`
    );

    return {
      statusCode: response.status,
      ticketId: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  ticket: [],
  tickets: [],
  searchTickets: [],
  cities: [],
  status: "idle",
  searchTicketsStatus:"idle",
  error: null,
};

const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllTicketByRoute.fulfilled, (state, action) => {
        const response = action.payload;
        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.searchTickets = [...data];
            state.searchTicketsStatus = "success";
          }
          if (statusCode === 202) {
            state.searchTicketsStatus = "emptyRoute";
          }
        } else {
          console.log("error occured in fetchAllTicketByRoute");
        }
      })
      .addCase(fetchAllTicketByRoute.pending, (state) => {
        state.searchTicketsStatus = "loading";
      })
      .addCase(fetchAllTicketByRoute.rejected, (state, action) => {
        state.searchTicketsStatus = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllCity.fulfilled, (state, action) => {
        const response = action.payload;
        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.cities = [...data];
          }
        } else {
          console.log("error occured in fetchAllCity");
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
      .addCase(createTicket.fulfilled, (state, action) => {
        const response = action.payload;
        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 201) {
            state.status = "idle";
            state.tickets = [data, ...state.tickets];
          }
          if (statusCode === 400) {
            console.log(data);
          }
        } else {
          console.log("error occur in createTicket");
        }
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const response = action.payload;
        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("change idle")
            state.tickets = [
              data,
              ...state.tickets.filter(
                (ticket) => ticket.id !== Number(data.id)
              ),
            ];
          }
        } else {
          console.log("error ocuur in updateTicket");
        }
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        const response = action.payload;
        if (response?.statusCode) {
          const { statusCode, ticketId } = response;
          if (statusCode === 200) {
            state.status = "idle";
            state.tickets = state.tickets.filter(
              (ticket) => ticket.id !== Number(ticketId)
            );
          }
        } else {
          console.log("error occured in deleteTicket");
        }
      })
      .addCase(fetchTicketByTicketId.fulfilled, (state, action) => {
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
      
  },
});

export default ticketSlice.reducer;
export const getAllCity = (state) => state.tickets.cities;
export const getAllTickets = (state) => state.tickets.tickets;
export const getStatus = (state) => state.tickets.status;
export const getSearchTicketsStatus =(state) => state.tickets.searchTicketsStatus
export const getError = (state) => state.tickets.error;
export const getAllSearchTickets = (state) => state.tickets.searchTickets;
export const getTicketById = (state, ticketId) =>
  state.tickets.tickets.find((ticket) => ticket.id === Number(ticketId));

export const getTicket = (state) => state.tickets.ticket;
