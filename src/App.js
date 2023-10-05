
import Layout from "./components/ui/Layout";
import SearchTicket from "./features/tickets/SearchTicket";
import ShowSearchTicket from "./features/tickets/ShowSearchTicket";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchTicket />} />
        <Route path="searchticket/:seatAmount" element={<ShowSearchTicket />} />
      </Route>
    </Routes>
  )
}

export default App;
