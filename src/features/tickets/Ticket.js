import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByTicketId, getOrders } from "../orders/orderSlice";
import { getRoles } from "../auths/authSlice";
import { imagePath } from "../config/pathConfig";

const Ticket = ({ ticket }) => {
  console.log(ticket);
  console.log(ticket.orders)
  const { seatAmount } = useParams();

  const dispatch = useDispatch();
  console.log(ticket.id);
  

  useEffect(() => {
    
      console.log(ticket.id)
      dispatch(fetchOrdersByTicketId(ticket.id));

    
  }, [ dispatch, ticket.id]);

  const orders = useSelector(getOrders);
  console.log(orders);

  const role = useSelector(getRoles)

  function dateTimeToTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = String(minutes).padStart(2, "0");
    let hour = 0;
    if (hours > 12) {
      hour = hours - 12;
    } else {
      hour = hours;
    }

    const dayNight = hours < 12 ? "AM" : "PM";

    return `${hour}:${formattedMinutes} ${dayNight}`;
  }

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNumber >= 0 && monthNumber <= 11) {
      return monthNames[monthNumber];
    } else {
      return "Invalid Month";
    }
  }

  function dateTimeToDate(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth());
    const onlyDate = date.getDate();
    return `${year} ${month} ${onlyDate}`;
  }

  const totalPrice = seatAmount * ticket.price;
  console.log(orders.length);

  function adminButton(role) {
    
    if (Array.isArray(role) && role.includes("ROLE_ADMIN")) {
      return (
        <>
        <Link
          to={`/ticket/update/${ticket?.id}`}
          className="btn btn-primary mt-2 me-3"
        >
          <span className="text-my text-bold">Update</span>
        </Link>
         <Link
         to={`/ticketOrders/${ticket?.id}`}
         className="btn btn-primary mt-2"
       >
         <span className="text-my text-bold">Orders</span>
       </Link>
       </>
      );
     }
    // if (Array.isArray(role) && length > 0 && role.includes("ROLE_ADMIN")) {
    //   return (
    //     <Link
    //       to={`/ticketOrders/${ticket?.id}`}
    //       className="btn btn-primary mt-2"
    //     >
    //       <span className="text-my text-bold">Orders</span>
    //     </Link>
    //   );
    // }
    else
    return (
      <Link
          to={`/selectSeat/${ticket?.id}/${seatAmount}`}
          className="btn btn-primary mt-2"
        >
          <span className="text-my text-bold">Select Seat</span>
        </Link>
    )
  }

  let userTicket = ""

  if (Array.isArray(role) && role.includes("ROLE_USER")) {
    userTicket = (
      <>
      <h4 className="text-success">{`MMK ${totalPrice}`}</h4>
            <p>{`${seatAmount} seat x ${ticket.price}`}</p>
      </>
    )
  } else userTicket = (
    <h4 className="text-success">{`${ticket.price} MMK`}</h4>
  )
  
  return (
    <div className="container">
    <div class="card my-3" style={{maxWidth: "100%"}}>
  <div class="row g-0">
    <div class="col-lg-7">
      <img src={`${imagePath}${ticket.image}`} className="img-fluid rounded-start" alt="..." style={{ width: "500px", height: "300px",objectFit:"cover"}}/>
    </div>
    <div class="col-lg-5">
      <div class="card-body">
        <h4>{`${dateTimeToTime(ticket.startDateTime)} - ${
              ticket.bus.typeName
            }`}</h4>
            <h6>{`${ticket.route.startLocation} - ${ticket.route.endLocation}`}</h6>
            <p>{`Departs : ${dateTimeToDate(
              ticket.startDateTime
            )}, ${dateTimeToTime(ticket.startDateTime)}`}</p>
            <p>{`Arrives : ${dateTimeToDate(
              ticket.endDateTime
            )}, ${dateTimeToTime(ticket.endDateTime)}`}</p>
            {userTicket}
            {/* <button onClick={canUpdate} className='btn btn-primary'>Update</button> */}
            {adminButton(role)}
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Ticket;
