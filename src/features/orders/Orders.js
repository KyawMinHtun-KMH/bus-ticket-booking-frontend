import React, { useEffect } from 'react'
import { fetchOrdersByTicketId, getError, getOrders, getStatus } from './orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OrderList from './OrderList'

const Orders = () => {
    const { ticketId } = useParams()
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchOrdersByTicketId(ticketId))
        }
    },[status,dispatch,ticketId])

    const orders = useSelector(getOrders)
    const error = useSelector(getError)

    console.log(orders);
    
    let content = '';

    if(status === 'success'){
        content = <OrderList orders={orders} /> 
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

export default Orders