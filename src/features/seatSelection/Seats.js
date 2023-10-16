import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSeatsByTicketId, getError, getSeats, getStatus } from './seatSlice'
import SelectSeat from './SelectSeat'

const Seats = () => {

    const { ticketid } = useParams()
    const status = useSelector(getStatus)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSeatsByTicketId(ticketid))
        }
    },[status,dispatch,ticketid])

    const error = useSelector(getError)
    const seats = useSelector(getSeats)

    let content = '';

    if(status === 'success'){
        content = <SelectSeat seats={seats} /> 
    }

    if(status === 'loading'){
        content = <p>Loading...</p>
    }

    if (status === 'failed') {
        content = <p>{error}</p>
    }

  return (
    <section>
        {content}
    </section>
  )
}

export default Seats