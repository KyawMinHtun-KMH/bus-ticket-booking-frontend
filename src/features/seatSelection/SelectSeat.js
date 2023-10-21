import React, { useEffect, useState } from "react";
import calsses from "./Bus.module.css";
import { dateTimeToDate, dateTimeToTime } from "../dateTime/dateTime";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTicketByTicketId, getTicket } from "../tickets/ticketSlice";
import { useDispatch, useSelector } from "react-redux";

const SelectSeat = ({ seats }) => {
  console.log(seats);

  const { seatAmount } = useParams()
   const { ticketid } = useParams();
   console.log(ticketid);

  const dispatch = useDispatch();
  const ticketId = ticketid

  useEffect(() => {
    dispatch(fetchTicketByTicketId(ticketId));
  }, [dispatch, ticketId]);

  const ticket = useSelector(getTicket);

  console.log(ticket);

  const [clickedValues, setClickedValues] = useState([]);
  // const ticketObj = {
  //   id:ticket.id,
  //   startLocation:ticket.route.startLocation,
  //   endLocation:ticket.route.endLocation,
  //   startDateTime:ticket.startDateTime,
  //   endDateTime:ticket.endDateTime,
  //   price:ticket.price
  // }

  const navigate = useNavigate();

  const handleButtonClick = () => {
    const arrayParam = encodeURIComponent(JSON.stringify(clickedValues));
    navigate(`/selectSeat/traveller/${ticketId}/${arrayParam}`);
  };

  const handleClick = (value) => {
    if (clickedValues.includes(value)) {
      // If the value is already in the array, remove it
      setClickedValues(clickedValues.filter((val) => val !== value));
    } else {
      // Add the clicked value to the array
      if (clickedValues.length < seatAmount) {
        setClickedValues([...clickedValues, value]);
      }
    }
  };

  console.log(clickedValues)

  const isSeatDisabled = (value) => {
    const isDisabled = seats.some(
      (s) => s.seat.seatNumber === String(value) && s.status === false
    );
    return isDisabled;
  };

  function busType(ticket) {
    const capacity = ticket.bus?.capacity;
    const capacityArray = [];

    for (let i = 1; i <= capacity; i++) {
      capacityArray.push(i);
    }
    if (String(ticket.bus?.typeName).toLowerCase().includes("vip")) {
      return (
        <div className="col offset-lg-1">
          <div className={`${calsses.driver}`}>Driver</div>
          {capacityArray.map((value, index) => (
            <React.Fragment key={index}>
              {value % 3 === 0 && (
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary"
                ></button>
              )}
              <button
                key={index}
                onClick={() => handleClick(value)}
                disabled={isSeatDisabled(value)}
                style={{
                  height: "70px",
                  borderRadius: "0",
                  background: isSeatDisabled(value) ? "black" : "",
                  
                }}
                className="col-3 btn btn-outline-secondary m-1"
                value={value}
              >
                {isSeatDisabled(value) && (
                  <span className="lock-icon">
                    <i className="bi bi-lock"></i>
                  </span>
                )}
                {value}
              </button>
            </React.Fragment>
          ))}
        </div>
      );
    } 
    
    if (String(ticket.bus?.typeName).toLowerCase().includes("standard")) {
      return (
        <div className="col offset-lg-1">
          <div className={`${calsses.driverStandard}`}>Driver</div>
          {capacityArray.map((value, index) => (
            <React.Fragment key={index}>
              {(value % 4 === 3 && value < 43) && (
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
              )}
              <button
                key={index}
                onClick={() => handleClick(value)}
                disabled={isSeatDisabled(value)}
                style={{
                  height: "70px",
                  borderRadius: "0",
                  background: isSeatDisabled(value) ? "black" : "",
                }}
                className={`col-2 btn btn-outline-secondary m-1`}
                value={value}
              >
                {isSeatDisabled(value) && (
                  <span className="lock-icon">
                    <i className="bi bi-lock"></i>
                  </span>
                )}
                {value}
              </button>
            </React.Fragment>
          ))}
        </div>
      );
    }
    if (String(ticket.bus?.typeName).toLowerCase().includes("business")) {
      return (
        <div className="col offset-lg-1">
          <div className={`${calsses.driverStandard}`}>Driver</div>
          {capacityArray.map((value, index) => (
            <React.Fragment key={index}>
              {(value % 4 === 3 && value < 26) && (
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
              )}
              {(value === 27) && (
                <>
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
                </>
              )}
              {(value % 4 === 1 && value > 28) && (
                <button
                  style={{ height: "50px", border: 0 }}
                  disabled
                  className="col-2 btn btn-outline-secondary me-2"
                ></button>
              )}
              
              <button
                key={index}
                onClick={() => handleClick(value)}
                disabled={isSeatDisabled(value)}
                style={{
                  height: "70px",
                  borderRadius: "0",
                  background: isSeatDisabled(value) ? "black" : "",
                }}
                className={`col-2 btn btn-outline-secondary m-1`}
                value={value}
              >
                {isSeatDisabled(value) && (
                  <span className="lock-icon">
                    <i className="bi bi-lock"></i>
                  </span>
                )}
                {value}
              </button>
            </React.Fragment>
          ))}
        </div>
      );
    }
  }

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-md-7 d-flex justify-content-center mb-3">
          <div className="card">
            <div className="card-header">Please select 1 seat(s).</div>
            <div className="card-body">
              <div className="row">{busType(ticket)}</div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header font-weight-bold">Booking Summary</div>
            <div className="card-body">
              <table className="table table-sm table-borderless summary-table ">
                <tbody>
                  <tr>
                    <td>Bus Operator</td>
                    <td>Burmese Bus</td>
                  </tr>

                  <tr>
                    <td>Route</td>
                    <td>{`${ticket.route?.startLocation} - ${ticket.route?.endLocation}`}</td>
                  </tr>
                  <tr>
                    <td>Departure Time</td>
                    <td>{`${dateTimeToDate(
                      ticket.startDateTime
                    )}, ${dateTimeToTime(ticket.startDateTime)}`}</td>
                  </tr>
                  <tr>
                    <td>Arrival Time</td>
                    <td>{`${dateTimeToDate(
                      ticket.endDateTime
                    )}, ${dateTimeToTime(ticket.endDateTime)}`}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-borderless table-sm summary-table">
                <tbody>
                  <tr>
                    <td className="text-success font-weight-bold">Subtotal</td>
                    <td className="text-success font-weight-bold">
                      {ticket.price * seatAmount} MMK
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card-body border-top">
              <div>
                <span className="text-danger">* </span>
                <span className="mr-2">NRC</span>
              </div>
            </div>

            <div className="card-body border-top">
              <div>
                <div className="d-flex justify-content-center mb-3 mt-1">
                  <h3 className="text-danger"> {clickedValues.join(", ")} </h3>
                </div>
                <div className="d-flex justify-content-center btn-lg">
                  <button
                    style={{ width: "100%" }}
                    disabled={clickedValues.length < seatAmount}
                    onClick={handleButtonClick}
                    className="btn btn-success"
                  >
                    Continue to Traveller Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectSeat;
