import React from 'react'
import { useSelector } from 'react-redux'
import { getAllTicket } from './ticketSlice'

const ShowSearchTicket = () => {
   const tickets = useSelector(getAllTicket)
  return (
    <div>ShowSearchTicket</div>
  )
}

export default ShowSearchTicket