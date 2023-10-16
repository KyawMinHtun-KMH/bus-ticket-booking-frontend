import React from "react";

const Order = ({ order }) => {
    console.log(order);
  function dateTimeToTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let hour = 0;
    if (hours > 12) {
      hour = hours - 12;
    } else {
      hour = hours;
    }

    const dayNight = hours < 12 ? "AM" : "PM";

    return `${hour}:${minutes} ${dayNight}`;
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
    return `${month} ${onlyDate}, ${year}`;
  }

function confirmOrder(order) {
    if (order.status) {
        return(
        <div className="col-12 mt-5 mb-3">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h5>Booking Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-sm-12 border-end mb-2 mt-1">
                <table className="table table-borderless table-sm summary-table ">
                  <tbody>
                  <tr>
                            <td>Booking Date</td>
                            <td>{`${dateTimeToDate(order.bookingDateTime)} - ${dateTimeToTime(order.bookingDateTime)}`}</td>
                        </tr>
                    <tr>
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
                        </tr>
                    
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 col-sm-12 ">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
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
              <div className="col-md-6 col-sm-none border-top"></div>
              <div className="col-md-6 col-sm-12 border-top pt-3">
                <table className="table table-borderless table-sm summary-table">
                  <tbody>
                    <tr>
                      <td
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        className="text-success font-weight-bold"
                      >
                        Subtotal
                      </td>
                      <td className="text-end pe-5"
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
      {confirmOrder(order)}
    </li>
  );
};

export default Order;
