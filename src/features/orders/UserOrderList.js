import React from "react";
import UserOrder from './UserOrder'
import classes from './UserOrderList.module.css'

const UserOrderList = ({ orders }) => {

  return (
    <div className="container">
      <div className="d-flex justify-content-center m-4 mb-5">
        <h3 className={classes.underline}>Booking History</h3>
      </div>
      <ul className={classes.list}>
        {orders?.map((order) => (
          <UserOrder key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default UserOrderList;
