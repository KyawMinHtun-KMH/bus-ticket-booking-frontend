import React from 'react'
import { useSelector } from 'react-redux'
import { getAllTickets } from './ticketSlice'

const ShowSearchTicket = () => {
   const tickets = useSelector(getAllTickets)
  return (
    <div>ShowSearchTicket</div>
  )
}

export default ShowSearchTicket