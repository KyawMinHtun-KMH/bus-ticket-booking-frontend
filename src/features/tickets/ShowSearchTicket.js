import React from 'react'
import { useSelector } from 'react-redux'
import { getAllSearchTickets,getStatus,getError } from './ticketSlice'
import TicketList from './TicketList'

const ShowSearchTicket = () => {
   const searchTickets = useSelector(getAllSearchTickets)

   const status = useSelector(getStatus)
   const error = useSelector(getError)

   let content ;

   if(status=== "success"){
    content = <TicketList tickets ={searchTickets}/>
   }

   if(status === "emptyRoute"){
    content = <h1>This Route is not avaliable now</h1> 
   }

   if(status === "loading"){
    content = <h1>Loading....</h1>
   }

   if(status === "failed"){
    content = <p>{error}</p>
   }

  return (
    <section>
      <h1>Search Ticket</h1>
      {content}
    </section>
  )
}

export default ShowSearchTicket