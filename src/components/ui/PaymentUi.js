import React from 'react'
import kpay from '../../features/images/kpay.png'
import ayapay from '../../features/images/ayapay.png'
import mpitesan from '../../features/images/mpitesan.png'
import onepay from '../../features/images/onepay.png'
import uabpay from '../../features/images/uabpay.png'
import wave from '../../features/images/wave.jpg'
import classes from './PaymentUi.module.css'
const PaymentUi = () => {
  return (
    <div className='container my-5'>
        <div className='row my-5'>
            <div className='col-12 text-center'>
                <h3>We Accept</h3>
            </div>
        </div>
        <div className='row mb-4'>
            <div className='d-flex justify-content-around'>
                <div><img src={kpay} id={classes.imgsize} alt='kpay.png'/></div>
                <div><img src={ayapay} id={classes.imgsize} alt='ayapay.png'/></div>
                <div><img src={mpitesan} id={classes.imgsize} alt='mpitesan.png'/></div>
                <div><img src={onepay} id={classes.imgsize} alt='onepay.png'/></div>
            </div>
        </div>
        <div className='row'>
            <div className='d-flex justify-content-around'>
                <div><img src={uabpay} id={classes.imgsize} alt='uabpay.png'/></div>
                <div><img src={wave} id={classes.imgsize} alt='wave.png'/></div>
            </div>
        </div>
    </div>
  )
}

export default PaymentUi