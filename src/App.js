import AllTickets from "./components/pages/AllTickets";
import NewTicket from "./components/pages/NewTicket";
import Layout from "./components/ui/Layout";
import SearchTicket from "./features/tickets/SearchTicket";
import ShowSearchTicket from "./features/tickets/ShowSearchTicket";
import { Route, Routes } from "react-router-dom";
import UpdateTicket from "./components/pages/UpdateTicket";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchTicket />} />
        <Route path="allTicket" element={<AllTickets />} />
        <Route path="searchticket/:seatAmount" element={<ShowSearchTicket />} />
        <Route path="newTicket" element={<NewTicket />} />
        <Route path="ticket/update/:ticketId" element={<UpdateTicket/>} />
      </Route>
    </Routes>
  )
}

export default App;
