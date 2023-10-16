import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../features/tickets/ticketSlice";
import routeSlice from "../features/routes/routeSlice";
import busSlice from "../features/bus/busSlice";
import orderSlice from "../features/orders/orderSlice";
import seatSlice from "../features/seatSelection/seatSlice";

export const store = configureStore({
    reducer : {
        tickets : ticketSlice,
        routes : routeSlice,
        buses : busSlice,
        orders : orderSlice,
        seats : seatSlice
    }
})