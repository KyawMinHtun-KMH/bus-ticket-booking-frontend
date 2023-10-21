
import NewTicket from "./components/pages/NewTicket";

import UpdateTicket from "./components/pages/UpdateTicket";

import AllTickets from "./components/pages/AllTickets";
import Layout from "./components/ui/Layout";
import Orders from "./features/orders/Orders";
import SearchTicket from "./features/tickets/SearchTicket";
import ShowSearchTicket from "./features/tickets/ShowSearchTicket";
import { Navigate, Route, Routes } from "react-router-dom";
import Traveller from "./features/seatSelection/Traveller";
import Payment from "./features/seatSelection/Payment";
import Seats from "./features/seatSelection/Seats";
import PaymentConfirmation from "./features/payment/PaymentConfirmation";
import YourOrders from "./components/pages/YourOrders";
import NewUser from "./components/pages/NewUser";
import ProtectedRoute from "./features/auths/ProtectedRoute";
import UnAuthorize from "./features/auths/UnAuthorize";
import { getRoles } from "./features/auths/authSlice";
import { useSelector } from "react-redux";
import SigninSignup from "./features/users/SigninSignup";

function App() {
  const role = useSelector(getRoles)

  let adminRole = "";

  if (Array.isArray(role) && role.includes("ROLE_ADMIN")) {
    adminRole = (
      <Route index element={<AllTickets />} />
  )
  }else adminRole = ( <Route index element={<SearchTicket />} />)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {adminRole}
        <Route path="searchticket/:seatAmount/:start/:end/:date" element={<ShowSearchTicket />} />
      <Route path="user" element={<NewUser />}>
          {/* <Route path="register" element={<Signup />} /> */}
          <Route path="login" element={<SigninSignup />} />
          <Route path="logout" element={<Navigate to="/" replace={true} />} />
        </Route>

        {/* Role_User */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}></ProtectedRoute>
          }
        >
        <Route path="unauthorized" element={<UnAuthorize />} />
        <Route path="orders" element={<YourOrders />} />
        <Route path="selectSeat/:ticketid/:seatAmount" element={<Seats />} />
        <Route path="selectSeat/traveller/:ticketId/:arrayParam" element={<Traveller />} />
        <Route path="selectSeat/traveller/:ticketId/:arrayParam/:travellerParam" element={<Payment />} />
        <Route path="order/payment/confirmation" element={<PaymentConfirmation />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}></ProtectedRoute>
          }
        >
         
        <Route path="newTicket" element={<NewTicket />} />
        <Route path="ticket/update/:ticketId" element={<UpdateTicket/>} />
        <Route path="ticketOrders/:ticketId" element={<Orders />} /> 
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App;
