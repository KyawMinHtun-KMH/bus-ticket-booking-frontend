import React, { useState } from "react";
import Order from "./Order";
import classes from "./OrderList.module.css";

const OrderList = ({ orders }) => {
  const [isConfirm, setConfirm] = useState(false);
  const trueOrders = orders.filter((order) => order.status === true);
  const falseOrders = orders.filter((order) => order.status === false);

  console.log(trueOrders);
  console.log(falseOrders);
  function requestOrderHandler() {
    setConfirm(false);
  }
  function confirmedOrderHandler() {
    setConfirm(true);
  }

  let emptyRequestOrders;
  if (falseOrders.length === 0) {
    emptyRequestOrders = (
      <div className="col-12 mt-5 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-3">
                There are no requested orders for this ticket at the moment.
              </p>
              <p className="mb-3">
                It appears that no passengers have requested bookings for this
                ticket yet. You can expect to see booking details here when
                passengers request orders for this ticket in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let emptyConfirmedOrders;
  if (trueOrders.length === 0) {
    emptyConfirmedOrders = (
      <div className="col-12 mt-5 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-3">
                These are the confirmed orders for this ticket. Passengers have
                successfully completed their bookings, and payments have been
                processed. You can review the details of each confirmed order
                below to ensure a smooth travel experience for your passengers.
                If there are any issues or discrepancies, please take
                appropriate action to resolve them promptly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center m-4 mb-5">
        <button
          onClick={requestOrderHandler}
          className={`${classes.test} border-end`}
        >
          Request Orders
        </button>
        <button onClick={confirmedOrderHandler} className={classes.test}>
          Confirmed Orders
        </button>
      </div>
      <div className="container">
        {!isConfirm && emptyRequestOrders}
        {isConfirm && emptyConfirmedOrders}
        <ul className={classes.list}>
          {orders?.map((order) => (
            <Order
              key={order.id}
              order={order}
              isConfirm={isConfirm}
              trueOrders={trueOrders}
              falseOrders={falseOrders}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrderList;
