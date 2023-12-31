import React,{ useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import TicketList from '../../features/tickets/TicketList'
import { fetchAllTickets, getAllTickets, getError, getStatus } from '../../features/tickets/ticketSlice'
import { getToken } from '../../features/auths/authSlice'

const AllTickets = () => {

    const status = useSelector(getStatus)

    const dispatch = useDispatch()
    const tickets = useSelector(getAllTickets)
    const token = useSelector(getToken)
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllTickets(
                {
                    token:String(token)
                }
            ))
        }
    },[status,dispatch,token])

    
    const error = useSelector(getError)

    
    let content = '';

    if(status === 'success'){
        content = <TicketList tickets={tickets} /> 
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

export default AllTickets