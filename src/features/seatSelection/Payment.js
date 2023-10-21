import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dateTimeToDate, dateTimeToTime } from "../dateTime/dateTime";
import wave from "../images/wave.jpg";
import kpay from "../images/kpay.png"
import ayaPay from "../images/ayapay.png"
import uabPay from "../images/uabpay.png"
import onePay from "../images/onepay.png"
import mpitesan from "../images/mpitesan.png"
import Wave from "../payment/Wave";
import Backdrop from "../../components/Backdrop";
import Kpay from "../payment/Kpay";
import AyaPay from "../payment/AyaPay";
import UabPay from "../payment/UabPay";
import OnePay from "../payment/OnePay";
import Mpitesan from "../payment/Mpitesan";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketByTicketId, getTicket } from "../tickets/ticketSlice";

const Payment = () => {
  const { ticketId, arrayParam, travellerParam } = useParams();
  const selectSeat = JSON.parse(decodeURIComponent(arrayParam));
  const travellerInfo = JSON.parse(decodeURIComponent(travellerParam));

  const [ isWave,setWave] = useState(false)
  const [ isKpay,setKpay] = useState(false)
  const [ isAyaPay,setAyaPay] = useState(false)
  const [ isUabPay,setUabPay] = useState(false)
  const [ isOnePay,setOnePay] = useState(false)
  const [ isMpitesan,setMpitesan] = useState(false)

  function waveHandler() {
    setWave(true)
  }
  function waveCloseHandler() {
    setWave(false)
  }
  function kpayHandler() {
    setKpay(true)
  }
  function kpayCloseHandler() {
    setKpay(false)
  }
  function ayaPayHandler() {
    setAyaPay(true)
  }
  function ayaPayCloseHandler() {
    setAyaPay(false)
  }
  function onePayHandler() {
    setOnePay(true)
  }
  function onePayCloseHandler() {
    setOnePay(false)
  }
  function uabPayHandler() {
    setUabPay(true)
  }
  function uabPayCloseHandler() {
    setUabPay(false)
  }
  function mpitesanHandler() {
    setMpitesan(true)
  }
  function mpitesanCloseHandler() {
    setMpitesan(false)
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTicketByTicketId(ticketId));
  }, [dispatch, ticketId]);

  const ticket = useSelector(getTicket);

  const orderRequest = {
    amount:ticket.price * selectSeat.length,
    ticketId:ticket.id,
    seatNumber:selectSeat,
    passenger:travellerInfo
  }

  console.log(ticket);
  console.log(selectSeat);
  console.log(travellerInfo);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 mb-3">
          <div className="card mb-2">
            <div className="btn card-body" onClick={waveHandler}>
              <img alt="wave" className="float-start col-1" style={{width:"45px"}} src={wave}/>
              <div className="float-end col-5 text-end me-1">Wave Money<br/>
              MMK</div>
            </div>
            {isWave && <Wave waveCloseHandler={waveCloseHandler} orderRequest={orderRequest} />}
            {isWave && <Backdrop />}
          </div>
          <div className="card mb-2">
            <div className="btn card-body" onClick={kpayHandler}>
              <img alt="kpay" className="float-start col-1" style={{width:"45px"}} src={kpay}/>
              <div className="float-end text-end col-2 me-1">KBZPay<br/>
              MMK</div>
              {isKpay && <Kpay kpayCloseHandler={kpayCloseHandler} orderRequest={orderRequest} />}
              {isKpay && <Backdrop />}
            </div>
          </div>
          <div className="card mb-2">
            <div className="btn card-body" onClick={ayaPayHandler}>
              <img alt="ayaPay" className="float-start col-1" style={{width:"45px"}} src={ayaPay}/>
              <div className="float-end text-end col-2 me-1">AYA Pay<br/>
              MMK</div>
              {isAyaPay && <AyaPay ayaPayCloseHandler={ayaPayCloseHandler} orderRequest={orderRequest}/>}
              {isAyaPay && <Backdrop />}
            </div>
          </div>
          <div className="card mb-2">
            <div className="btn card-body" onClick={uabPayHandler}>
              <img alt="uabpay" className="float-start col-1" style={{width:"45px"}} src={uabPay}/>
              <div className="float-end text-end col-2 me-1">UabPay<br/>
              MMK</div>
              {isUabPay && <UabPay uabPayCloseHandler={uabPayCloseHandler} orderRequest={orderRequest}/>}
              {isUabPay && <Backdrop />}
            </div>
          </div>
          <div className="card mb-2">
            <div className="btn card-body" onClick={onePayHandler}>
              <img alt="onepay" className="float-start col-1" style={{width:"45px"}} src={onePay}/>
              <div className="float-end text-end col-2 me-1">OnePay<br/>
              MMK</div>
              {isOnePay && <OnePay onePayCloseHandler={onePayCloseHandler} orderRequest={orderRequest} /> }
              {isOnePay && <Backdrop />}
            </div>
          </div>
          <div className="card mb-2">
            <div className="btn card-body" onClick={mpitesanHandler}>
              <img alt="m-pitesan" className="float-start col-1" style={{width:"45px"}} src={mpitesan}/>
              <div className="float-end text-end col-2 me-1">M-Pitesan<br/>
              MMK</div>
              {isMpitesan && <Mpitesan mpitesanCloseHandler={mpitesanCloseHandler} orderRequest={orderRequest}/>}
              {isMpitesan && <Backdrop />}
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header font-weight-bold">
              <h5>Booking Summary</h5>
            </div>
            <div className="card-body">
              <table className="table table-sm table-borderless summary-table ">
                <tbody>
                  <tr>
                    <td>Bus Operator</td>
                    <td>Burmese Bus</td>
                  </tr>

                  <tr>
                    <td>Route</td>
                    <td>{`${ticket.startLocation} - ${ticket.endLocation}`}</td>
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

              <table className="table table-borderless table-sm summary-table border-top">
                <tbody>
                  <tr>
                    <td>Number of Seats</td>
                    <td>{selectSeat.length} seat(s) </td>
                  </tr>

                  <tr>
                    <td>Seat No.</td>
                    <td>{selectSeat.join(", ")}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-borderless table-sm summary-table border-top">
                <tbody>
                  <tr>
                    <td>Traveller Name</td>
                    <td>{travellerInfo.name}</td>
                  </tr>

                  <tr>
                    <td>Phone</td>
                    <td>{travellerInfo.phone}</td>
                  </tr>

                  <tr>
                    <td>Email</td>
                    <td>{travellerInfo.email}</td>
                  </tr>
                </tbody>
              </table>

              <table className="table table-borderless table-sm summary-table border-top">
                <tbody>
                  <tr>
                    <td className="text-success font-weight-bold">Subtotal</td>
                    <td className="text-success font-weight-bold">
                      {ticket.price * selectSeat.length} MMK
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
