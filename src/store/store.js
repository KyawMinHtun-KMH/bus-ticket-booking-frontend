import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../features/tickets/ticketSlice";
import routeSlice from "../features/routes/routeSlice";
import busSlice from "../features/bus/busSlice";

export const store = configureStore({
    reducer : {
        tickets : ticketSlice,
        routes : routeSlice,
        buses : busSlice
    }
})