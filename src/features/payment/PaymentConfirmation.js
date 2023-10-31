import React from "react";
import { Link } from "react-router-dom"

const PaymentConfirmation = () => {
  return (
    <section className="container">
        <div className="card-body mb-5">
          <h3 className="card-title mt-4">PAYMENT CONFIRMATION</h3>
          <br/>
          <div className="border-top col-6"/>
          <br/>
          <br/>
          <p className="card-text text-muted" style={{fontSize:"0.75rem"}}>
            Thank You! <br/><br/>
            You have successfully reserved your seat(s) for this trip.A confirmation email will sent to your Email Address with your ticket,reservation and important information about your trip.
            <br/><br/>
            If you do not confirmation email in your inbox,please do check your Bulk folder,and update your spam filter settings to allow emails from Burmese Bus. 
          </p>
          <Link to="/" className="btn btn-primary mt-3">
            Back
          </Link>
        </div>
    </section>
  );
};

export default PaymentConfirmation;
