import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchConfirmOrder, fetchDeleteOrder } from "./orderSlice";
import { useNavigate } from "react-router-dom";

const Order = ({ order,isConfirm }) => {
    console.log(order);
//   function dateTimeToTime(dateTime) {
//     const date = new Date(dateTime);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     let hour = 0;
//     if (hours > 12) {
//       hour = hours - 12;
//     } else {
//       hour = hours;
//     }

//     const dayNight = hours < 12 ? "AM" : "PM";

//     return `${hour}:${minutes} ${dayNight}`;
//   }

//   function getMonthName(monthNumber) {
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     if (monthNumber >= 0 && monthNumber <= 11) {
//       return monthNames[monthNumber];
//     } else {
//       return "Invalid Month";
//     }
//   }

//   function dateTimeToDate(dateTime) {
//     const date = new Date(dateTime);
//     const year = date.getFullYear();
//     const month = getMonthName(date.getMonth());
//     const onlyDate = date.getDate();
//     return `${month} ${onlyDate}, ${year}`;
//   }
const navigate = useNavigate()
const dispatch = useDispatch();
const [requestStatus,setRequestStatus] = useState('idle')

const onAccept = (e) => {
    e.preventDefault();
    if (requestStatus === 'idle') {
    setRequestStatus('pending')
    dispatch(fetchConfirmOrder(order.id))
    }
    setRequestStatus('idle')
    navigate(`/ticketOrders/${order.ticket.id}`)
}

const onReject = (e) => {
    e.preventDefault();
    if (requestStatus === 'idle') {
    setRequestStatus('pending')
    dispatch(fetchDeleteOrder(order.id))
    }
    setRequestStatus('idle')
    navigate(`/ticketOrders/${order.ticket.id}`)
}

function requestOrder(order) {
    if (!order.status) {
        return(
        <div className="col-12 mt-5 mb-3">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h5>Booking Summary</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-sm-12 border-end mb-2 mt-1">
                <table className="table table-borderless table-sm summary-table ">
                  <tbody>
                    {/* <tr>
                            <td>Route</td>
                            <td>{`${order.ticket.route.startLocation} - ${order.ticket.route.endLocation}`}</td>
                        </tr>
                        <tr>
                            <td>Departure Time</td>
                            <td>{`${dateTimeToDate(order.ticket.startDateTime)} - ${dateTimeToTime(order.ticket.startDateTime)}`}</td>
                        </tr>
                        <tr>
                            <td>Arrival Time</td>
                            <td>{`${dateTimeToDate(order.ticket.endDateTime)} - ${dateTimeToTime(order.ticket.endDateTime)}`}</td>
                        </tr> */}
                    <tr>
                      <td>Traveller Name</td>
                      <td>{`${order.passenger.name}`}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{`${order.passenger.phoneNumber}`}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{`${order.passenger.email}`}</td>
                    </tr>
                    <tr>
                      <td>Seats Number</td>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >{order.seatNumber.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 col-sm-12 ">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
                    <tr>
                      <td>Holder Name</td>
                      <td>{`${order.payment.holderName}`}</td>
                    </tr>
                    <tr>
                      <td>Payment Type</td>
                      <td>{`${order.payment.paymentType}`}</td>
                    </tr>
                    <tr>
                      <td>Payment Number</td>
                      <td>{`${order.payment.phoneNo}`}</td>
                    </tr>
                    <tr>
                      <td>Transaction Id</td>
                      <td>{`${order.payment.transactionId}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 col-sm-12 border-top pt-3 border-end">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
                    <tr>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        className="text-success font-weight-bold"
                      >
                        Subtotal
                      </td>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >{`${order.totalPrice} MMK`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 col-sm-12 border-top pt-3">
                <div className="d-flex justify-content-center">
                  <button onClick={onReject} className="btn btn-danger me-5">Reject</button>
                  <button onClick={onAccept} className="btn btn-success">Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    return null
}

function confirmOrder(order) {
    if (order.status) {
        return(
        <div className="col-12 mt-5 mb-3">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h5>Booking Summary</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-sm-12 border-end mb-2 mt-1">
                <table className="table table-borderless table-sm summary-table ">
                  <tbody>
                    {/* <tr>
                            <td>Route</td>
                            <td>{`${order.ticket.route.startLocation} - ${order.ticket.route.endLocation}`}</td>
                        </tr>
                        <tr>
                            <td>Departure Time</td>
                            <td>{`${dateTimeToDate(order.ticket.startDateTime)} - ${dateTimeToTime(order.ticket.startDateTime)}`}</td>
                        </tr>
                        <tr>
                            <td>Arrival Time</td>
                            <td>{`${dateTimeToDate(order.ticket.endDateTime)} - ${dateTimeToTime(order.ticket.endDateTime)}`}</td>
                        </tr> */}
                    <tr>
                      <td>Traveller Name</td>
                      <td>{`${order.passenger.name}`}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{`${order.passenger.phoneNumber}`}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{`${order.passenger.email}`}</td>
                    </tr>
                    <tr>
                      <td>Seats Number</td>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >{`${order?.seatNumber.join(", ")}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 col-sm-12 ">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
                    <tr>
                      <td>Holder Name</td>
                      <td>{`${order.payment.holderName}`}</td>
                    </tr>
                    <tr>
                      <td>Payment Type</td>
                      <td>{`${order.payment.paymentType}`}</td>
                    </tr>
                    <tr>
                      <td>Payment Number</td>
                      <td>{`${order.payment.phoneNo}`}</td>
                    </tr>
                    <tr>
                      <td>Transaction Id</td>
                      <td>{`${order.payment.transactionId}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-12 col-sm-12 border-top pt-3">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
                    <tr>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        className="text-success font-weight-bold"
                      >
                        Subtotal
                      </td>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >{`${order.totalPrice} MMK`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    return null
}

  return (
    <li>
      {!isConfirm && requestOrder(order)}
      {isConfirm && confirmOrder(order)}
    </li>
  );
};

export default Order;
