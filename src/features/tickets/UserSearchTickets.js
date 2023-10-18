import React from 'react'
import SearchedTicketForm from './SearchedTicketForm'
import TicketList from './TicketList'

const UserSearchTickets = ({searchTickets}) => {
  return (
    <>
        <SearchedTicketForm />
        <TicketList tickets={searchTickets} />
    </>
  )
}

export default UserSearchTickets