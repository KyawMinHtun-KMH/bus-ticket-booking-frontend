import React from 'react'
import Ticket from './Ticket'
import classes from './TicketList.module.css'

const TicketList = ({tickets}) => {
    return (
        <ul className={classes.list}>
           { tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket}/>) }
        </ul>
      )
}

export default TicketList