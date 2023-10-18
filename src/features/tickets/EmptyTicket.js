import React from 'react'
import SearchedTicketForm from './SearchedTicketForm'
const EmptyTicket = () => {
  return (
    <>
        <SearchedTicketForm />
        <div className='container my-5'>
            <div className='row mb-3'>
                <div className='col-12 text-center'>
                    <h3>Ticket is not avaliable now</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p><i>Please find another date and route</i></p>
                </div>
            </div>
        </div>
        {/* <p>Ticket is not avaliable now</p>
        <p>Please find another date and route</p> */}
    </>
  )
}

export default EmptyTicket