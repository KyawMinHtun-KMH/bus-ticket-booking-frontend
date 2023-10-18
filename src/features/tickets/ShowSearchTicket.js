import React from 'react'
import { useSelector } from 'react-redux'
import { getAllSearchTickets,getSearchTicketsStatus,getError } from './ticketSlice'
import UserSearchTickets from './UserSearchTickets'
import EmptyTicket from './EmptyTicket'

const ShowSearchTicket = () => {
   const searchTickets = useSelector(getAllSearchTickets)

   const status = useSelector(getSearchTicketsStatus)
   const error = useSelector(getError)

   let content ;

   if(status=== "success"){
    content = <UserSearchTickets searchTickets={searchTickets}/>
   }

   if(status === "emptyRoute"){
    content = <EmptyTicket />
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