import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersByUser, getError, getOrders, getStatus } from '../../features/orders/orderSlice'
import { useEffect } from 'react'
import UserOrderList from '../../features/orders/UserOrderList'

const YourOrders = () => {
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchOrdersByUser())
        }
    },[status,dispatch])

    const orders = useSelector(getOrders)
    const error = useSelector(getError)

    
    let content = '';

    if(status === 'success'){
        content = <UserOrderList orders={orders} /> 
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

export default YourOrders