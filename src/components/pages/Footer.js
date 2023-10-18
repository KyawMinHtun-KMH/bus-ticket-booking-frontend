import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
        <div id={classes.footertop} className='py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-5 col-12'>
                        <h2 className='text-white'>Burmese Bus Express</h2>
                        <div className='text-white border-top pt-2'>
                        Burmese Bus Express is the very first express car service in Myanmar which created the best routes and services for the passengers. We are very proud to introduce you with the best express bus routes and services to you.
                        </div>
                    </div>
                    <div className='col-sm-3 col-12'>
                        <h2 className='text-white'>Need Help?</h2>
                        <div className='border-top pt-2'>
                        <strong><i className="fa fa-phone me-2" aria-hidden="true" style={{color : "white"}} /></strong><span className='text-white'>09-367359153</span>
                        <br/>
                        <strong><i className="fa-solid fa-envelope me-2" style={{color : "white"}}/></strong><span className='text-white'>brmesebusexpress@gmail.com</span>
                        </div>
                    </div>
                    <div className='col-sm-4 col-12'>
                         
                    </div>
                </div>
            </div>

        </div>
        <div id={classes.footerbottom} className='footerbottom border-white border-top'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center text-white py-4'>
                        @ 2023 burmesebusticket.com
                    </div>
                </div>
            </div>

        </div>
    </footer>
  )
}

export default Footer