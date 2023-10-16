import React from 'react'
import TicketForm from '../../features/tickets/TicketForm'
import RouteForm from '../../features/routes/RouteForm'
import BusForm from '../../features/bus/BusForm'

const NewTicket = () => {
  return (
    <div className='mt-3 container'>
        
        <TicketForm />
        <RouteForm />
        <BusForm />
    </div>
  )
}

export default NewTicket