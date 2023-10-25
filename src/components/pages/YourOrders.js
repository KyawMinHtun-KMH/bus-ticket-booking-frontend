import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersByUser, getError, getOrder, getStatus } from '../../features/orders/orderSlice'
import { useEffect } from 'react'
import UserOrderList from '../../features/orders/UserOrderList'
import { getToken } from '../../features/auths/authSlice'

const YourOrders = () => {
    const status = useSelector(getStatus)

    const dispatch = useDispatch()
    const token = useSelector(getToken)

    useEffect(() => {
        
            dispatch(fetchOrdersByUser({
                token:String(token)
    }))
        
    },[dispatch,token])

    const orders = useSelector(getOrder)
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