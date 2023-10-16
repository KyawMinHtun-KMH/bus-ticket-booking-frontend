import React, { useState } from "react";
import Order from "./Order";
import classes from "./OrderList.module.css";

const OrderList = ({ orders }) => {

  const [ isConfirm,setConfirm ] = useState(false)

  function requestOrderHandler() {
    setConfirm(false)
  }
  function confirmedOrderHandler() {
    setConfirm(true)
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center m-4 mb-5">
        <button onClick={requestOrderHandler} className={`${classes.test} border-end`}>Request Orders</button>
        <button onClick={confirmedOrderHandler} className={classes.test}>Confirmed Orders</button>
      </div>
      <ul className={classes.list}>
        {orders?.map((order) => (
          <Order key={order.id} order={order} isConfirm={isConfirm}/>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
