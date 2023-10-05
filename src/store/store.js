import { configureStore } from "@reduxjs/toolkit";
import ticketSlice from "../features/tickets/ticketSlice";

export const store = configureStore({
    reducer : {
        tickets : ticketSlice
    }
})