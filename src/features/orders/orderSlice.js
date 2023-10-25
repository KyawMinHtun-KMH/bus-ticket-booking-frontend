import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { emailPath, orderPath } from "../config/pathConfig";

export const fetchDeleteOrder = createAsyncThunk("deleteOrder",
async (data) => {
  try {
    const rejectMailResponse = await axios.post(`${emailPath}/reject/${data.orderId}`,null,{
      headers: {
        "Authorization":data.token
      },
    })
    if(rejectMailResponse.status === 200){

    const response = await axios.delete(`${orderPath}/${data.orderId}/delete`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization":data.token
      },
    });
    
    return {
      statusCode: response.status,
      orderId: response.data,
    };
  }
  } catch (error) {
    console.error(error);
  }
}
)

export const fetchConfirmOrder = createAsyncThunk("confirmOrder",
async (data) => {
  try {
    const confirmMailResponse = await axios.post(`${emailPath}/confirm/${data.orderId}`,null,{
      headers: {
        "Authorization":data.token
      },
    })

    if(confirmMailResponse.status === 200){
    const response = await axios.put(`${orderPath}/${data.orderId}/update`,null,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization":data.token
      },
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  }
  } catch (error) {
    console.error(error);
  }
}
)

export const fetchOrdersByTicketId = createAsyncThunk(
  "fetchOrdersByTicketId",
  async (ticketId) => {
    try {
      const response = await axios.get(`${orderPath}/${ticketId}`);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchOrdersByUser = createAsyncThunk(
  "fetchOrdersByUser",
  async (data) => {
    try {
      const response = await axios.get(`${orderPath}/get`,{
      headers: {
        "Content-Type": "application/json",
        'Authorization':data.token
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

export const postNewOrder = createAsyncThunk("postNewOrder", async (data) => {
  try {
    const response = await axios.post(
      `${orderPath}/create/${data.ticketId}`,
      data.orderRequest,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization':data.token
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
});

const initialState = {
  order:[],
  orders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
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
    .addCase(fetchConfirmOrder.fulfilled, (state, action) => {
      const response = action.payload;

      if (response?.statusCode) {
        const { statusCode, data } = response;

        if (statusCode === 201) {
          state.status = 'idle'
          state.orders = [data,...state.orders.filter(order => order.id !== Number(data.id))]
        }

        if (statusCode === 400) {
          state.status = "failed";
          state.error = String(data);
        }
      } else {
        console.log("error occured in confirmOrder");
      }
    })
    .addCase(fetchDeleteOrder.fulfilled, (state, action) => {
      const response = action.payload;

      if (response?.statusCode) {
        const { statusCode, orderId } = response;
          if (statusCode === 200) {
            state.status = 'idle'
            state.orders = state.orders.filter(order => order.id !== Number(orderId))
          }
          if (statusCode === 404) {
            console.log(orderId)
          }
      } else {
        console.log("error occured in deleteOrder");
      }
    })
    .addCase(fetchOrdersByTicketId.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchOrdersByTicketId.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
      const response = action.payload;

      if (response?.statusCode) {
        const { statusCode, data } = response;

        if (statusCode === 200) {
          state.order = [...data];
          state.status = "success";
        }

        if (statusCode === 403) {
          state.status = "failed";
          state.error = String(data);
        }
      } else {
        console.log("error occured in fetchOrdersByUser");
      }
    })
    .addCase(fetchOrdersByUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchOrdersByUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    .addCase(postNewOrder.fulfilled, (state,action) => {
      const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;

          if (statusCode === 201) {
            state.status = 'idle'
            state.order = [...state.order,data]
          }
          if (statusCode === 404) {
            console.log(data)
          }
        }else {
            console.log("error occured in postNewOrder");
          }
    })
  },
});

export default orderSlice.reducer;
export const getOrders = (state) => state.orders.orders;
export const getStatus = (state) => state.orders.status;
export const getError = (state) => state.orders.error;
export const getOrder = (state) => state.orders.order;
// export const getOrderById = (state, orderId) =>
//   state.orders.orders.find((order) => order.id === Number(orderId));
