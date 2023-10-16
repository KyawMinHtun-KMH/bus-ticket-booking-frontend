import React, { useState } from "react";
import classes from "./Wave.module.css";
import image from "../images/kpay.png";
import { useDispatch } from "react-redux";
import { postNewOrder } from "../orders/orderSlice";
import { useNavigate } from "react-router-dom";

const Kpay = ({ orderRequest, kpayCloseHandler }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [requestStatus,setRequestStatus] = useState('idle')

  const onNameChange = (e) => setName(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onTransactionIdChange = (e) => setTransactionId(e.target.value);

  function closeHandler() {
    kpayCloseHandler();
  }

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const seatNumberArray = orderRequest.seatNumber.map(String);

  const canCreate = [name,phone,transactionId].every(Boolean) && requestStatus === 'idle'

  console.log(orderRequest.ticketId);
  const onSubmit = (e) => {
    e.preventDefault();
    if (canCreate) {
      setRequestStatus('pending')
    dispatch(
      postNewOrder({
        orderRequest: {
          seatNumber: [...seatNumberArray],
          payment: {
            holderName: name,
            paymentType: "KBZPAY",
            phoneNo: phone,
            transactionId: transactionId,
          },
          passenger: {
            name: orderRequest.passenger.name,
            gender: orderRequest.passenger.gender,
            phoneNumber: orderRequest.passenger.phone,
            email: orderRequest.passenger.email,
            specialRequest: orderRequest.passenger.specialRequest,
          },
        },
        ticketId: orderRequest.ticketId,
      })
    );
    setRequestStatus('idle')
    setName('')
    setPhone('')
    setTransactionId('')
    navigate('/order/payment/confirmation')
    }
  };

  return (
    <div className={classes.modal}>
      <button
        type="button"
        onClick={closeHandler}
        className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
      ></button>
      <img
        className="col-10 top-0 start-0"
        style={{ height: "60px", width: "60px" }}
        src={image}
        alt="kpay"
      ></img>
      <div className="mt-2 text-start">
        <table className="table table-borderless table-sm summary-table">
          <tbody>
            <tr>
              <td>
                <p className="fw-bold d-inline">Kpay Number</p> &nbsp; : &nbsp;
                09787748496
              </td>
            </tr>
            <tr>
              <td>
                <p className="fw-bold d-inline">Kpay Name</p> &nbsp; : &nbsp;
                Khant Zin Min
              </td>
            </tr>
            <tr>
              <td>
                <p className="fw-bold d-inline">Amount</p> &nbsp; : &nbsp;
                {orderRequest.amount} MMK
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form>
        <div className="text-start mb-2">
          <label className="text-weight-normal col-6 required mb-2">
            Holder Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            required="required"
            onChange={onNameChange}
            value={name}
          />
        </div>

        <div className="text-start mb-2">
          <label className="text-weight-normal col-6 required mb-2">
            Your Phone No.
          </label>

          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required="required"
            onChange={onPhoneChange}
            value={phone}
          />
        </div>
        <div className="text-start mb-2">
          <label className="text-weight-normal col-6 mb-2">
            Transaction ID
          </label>

          <input
            type="text"
            id="transactionId"
            name="transactionId"
            onChange={onTransactionIdChange}
            value={transactionId}
            required
          />
        </div>

        {/* <div className="text-start mb-2">
          <label className="text-weight-normal col-6 mb-2">
            Confirmation screenshot
          </label>

          <input type="file" className="col-6" id="screenshot" name="screenshot" />
        </div> */}

        <div className="d-flex justify-content-center">
          <button
            style={{ width: "100%" }}
            onClick={onSubmit}
            disabled={!canCreate}
            className="btn btn-success"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Kpay;
