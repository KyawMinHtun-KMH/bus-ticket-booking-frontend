import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../features/tickets/ticketSlice";
import orderSlice from "../features/orders/orderSlice";
import seatSlice from "../features/seatSelection/seatSlice";

export const store = configureStore({
    reducer : {
        tickets : ticketSlice,
        orders : orderSlice,
        seats : seatSlice
    }
})