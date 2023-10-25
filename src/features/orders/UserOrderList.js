import React from "react";
import UserOrder from './UserOrder'
import classes from './UserOrderList.module.css'

const UserOrderList = ({ orders }) => {
console.log(orders)
  const trueOrders = orders.filter((order) => order.status === true);

  let emptyConfirmedOrders;
  if (trueOrders.length === 0) {
    emptyConfirmedOrders = (
      <div className="col-12 mt-5 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-12 text-center">
            <p className="mb-5">
                You haven't placed any orders yet. Start by creating a new order!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center m-4 mb-5">
        <h3 className={classes.underline}>Booking History</h3>
      </div>
      {emptyConfirmedOrders}
      <ul className={classes.list}>
        {orders?.map((order) => (
          <UserOrder key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default UserOrderList;
