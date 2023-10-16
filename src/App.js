
import AllTickets from "./components/pages/AllTickets";
import Layout from "./components/ui/Layout";
import Orders from "./features/orders/Orders";
import SearchTicket from "./features/tickets/SearchTicket";
import ShowSearchTicket from "./features/tickets/ShowSearchTicket";
import { Route, Routes } from "react-router-dom";
import Traveller from "./features/seatSelection/Traveller";
import Payment from "./features/seatSelection/Payment";
import Seats from "./features/seatSelection/Seats";
import PaymentConfirmation from "./features/payment/PaymentConfirmation";
import YourOrders from "./components/pages/YourOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchTicket />} />
        <Route path="ticketOrders/:ticketId" element={<Orders />} />
        <Route path="orders" element={<YourOrders />} />
        <Route path="selectSeat/:ticketid" element={<Seats />} />
        <Route path="selectSeat/traveller/:objectParam/:arrayParam" element={<Traveller />} />
        <Route path="selectSeat/traveller/:objectParam/:arrayParam/:travellerParam" element={<Payment />} />
        <Route path="allTickets" element={<AllTickets />} />
        <Route path="searchticket/:seatAmount" element={<ShowSearchTicket />} />
        <Route path="order/payment/confirmation" element={<PaymentConfirmation />} />
      </Route>
    </Routes>
  )
}

export default App;
