import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getTicketById,updateTicket,deleteTicket, changeStatus } from './ticketSlice'
import { fetchAllBus,getAllBus } from '../bus/busSlice'
import { getAllRoute,fetchAllRoute } from '../routes/routeSlice'
import { getToken } from '../auths/authSlice'
import { fetchOrdersByTicketId, getOrders } from '../orders/orderSlice'


const UpdateTicketForm = () => {

    const { ticketId } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
       
            dispatch(fetchOrdersByTicketId(
                ticketId))
        
    },[ticketId,dispatch])

    const orders = useSelector(getOrders)
    console.log(orders);
    
    const ticket = useSelector((state) =>
        getTicketById(state,ticketId)
    )

    const token = useSelector(getToken)
    
    const existedStartLocation = ticket.route.startLocation
    const existedEndLocation = ticket.route.endLocation
    const existedBindRoute = existedStartLocation+"-"+existedEndLocation

    function formatDateToISOStringWithoutSecondsAndMilliseconds(date) {
        const isoString = date.toISOString();
        // Remove the seconds and milliseconds part
        return isoString.slice(0, 16);
      }
      
      
      const today = new Date();
      const formattedDateTime = formatDateToISOStringWithoutSecondsAndMilliseconds(today);
    
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with 0 if needed
      const day = String(today.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;

      

      useEffect(()=>{
        dispatch(fetchAllBus({
          token:String(token)
        }))
      },[dispatch,token])
    
      const buses = useSelector(getAllBus)
      const typeNames = buses.map((bus) => bus.typeName)
      const typeNamesOption = typeNames.map((typeName) => <option
        key={typeName}
        value={typeName}
      >
        {typeName}
      </option>)

    useEffect(()=>{
    dispatch(fetchAllRoute({
      token:String(token)
    }))
  },[dispatch,token])

  const routes = useSelector(getAllRoute)
  const bindRoutes = routes.map((route)=>route.startLocation+"-"+route.endLocation)

  const renderedOptions = bindRoutes.map((bindRoute)=><option
    key={bindRoute}
    value={bindRoute}
  >
  {bindRoute}
  </option>)
    
    // const [image,setImage] = useState("")
    const [typeName,setTypeName] = useState(ticket?.bus.typeName)
    const [price,setPrice] = useState(ticket?.price)
    const [startDateTime,setStartDateTime] = useState(ticket?.startDateTime)
    const [endDateTime,setEndDateTime] = useState(ticket?.endDateTime)
    const [bindRoute,setBindRoute] = useState(existedBindRoute)
    const [requestStatus,setRequestStatus] = useState('idle')

    const onTypeNameChange = e => setTypeName(e.target.value)
    const onPriceChange = e => setPrice(e.target.value)
    const onStartDateTimeChange = e =>setStartDateTime(e.target.value)
    const onEndDateTimeChange = e =>setEndDateTime(e.target.value)
    // const onImageChange = (e) => {
    //   setImage(e.target.files[0])
    // }
    const onBindRouteChange = e =>setBindRoute(e.target.value)

    const canUpdate = [typeName,price,startDateTime,endDateTime,bindRoute].every(Boolean) && requestStatus === 'idle'

    const index = bindRoute.indexOf('-')
    const startLocation = bindRoute.substring(0,index)
    const endLocation = bindRoute.substring(index+1)

    const depature = startDateTime.slice(0,10)

    const navigate = useNavigate()

    const onUpdate=(e) =>{
        e.preventDefault()
        
        if(canUpdate){
            setRequestStatus("pending")
            dispatch(updateTicket({
                ticketRequest : {
                    ticket : {
                        id : ticket.id,
                        price,
                        image : ticket.image,
                        depature,
                        startDateTime,
                        endDateTime
                      },
                      typeName,
                      route : {
                        startLocation,
                        endLocation
                      }
                },
                token :String(token)
            })
        )
        dispatch(changeStatus("idle"))
        setRequestStatus("idle")
        navigate("/")
      
        }
    }

    const onDelete = (e) =>{
      e.preventDefault()
      dispatch(deleteTicket({
        ticketId,
        token :String(token)
      }))
      navigate("/")
    }

    function ordersOccur(orders) {
      if (orders.length > 0) {
        return (
        <div className="container mt-5 mb-5 ">
          <div className="card-body">
            <h4 className="card-title text-danger mb-5">Unable to Update Ticket</h4>
            <p className='text-muted mb-5'>
              Sorry, you cannot update this ticket because there are existing orders associated with it. Ticket updates may impact the orders, and for consistency and customer satisfaction, we do not allow updates once orders have been made.
            </p>
            <Link to="/" className="btn btn-primary mt-3">
            Back
          </Link>
          </div>
          
        </div>
      )
      } else return (<div className='container mt-5 mb-5'>
      <div className="card">
        <div className="card-body">
        <h4 className="card-title text-success">Update ticket</h4>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="typeName" className="form-label" >
            TypeName
          </label>
          <select id="typeName" className="form-select" value={typeName} onChange={onTypeNameChange}>
            {typeNamesOption}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="price" className="form-label" >
            Price
          </label>
          <input type="text" className="form-control" id="price" value={price} onChange={onPriceChange}/>
        </div>
        
        <div className="col-6">
          <label htmlFor="startDateTime" className="form-label">
            Start DateTime
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="startDateTime"
            value={startDateTime}
            onChange={onStartDateTimeChange}
            min={formattedDateTime}
          />
        </div>
        {/* <div className='col-6'>
          <label htmlFor="image" className="form-label">image</label>
          <input type='file' id='image' className="form-control" onChange={onImageChange}/>
        </div> */}
        <div className="col-md-6">
          <label htmlFor="endDateTime" className="form-label">
            End DateTime
          </label>
          <input type="datetime-local" className="form-control" id="endDateTime" value={endDateTime} onChange={onEndDateTimeChange} min={formattedDateTime}/>
        </div>
        <div className="col-md-12">
          <label htmlFor="route" className="form-label">
            Route
          </label>
          <select id="route" className="form-select" value={bindRoute} onChange={onBindRouteChange}>
            {renderedOptions}
          </select>
        </div>
  
        <div className="col-12 d-flex justify-content-center">
          <button onClick={onUpdate} type="submit" className="btn btn-primary me-2">
            Update
          </button>
          {/*Button trigger modal*/}
  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Delete
  </button>
  
  {/*Modal*/ }
  <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div className="modal-dialog modal-dialog-centered" id="exampleModal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Delete ticket</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          Are you sure you went to Delete?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button onClick={onDelete} type="button" className="btn btn-danger" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
        </div>
      </form>
      </div>
      </div>
      </div>)
    }

  return (
    ordersOccur(orders)
  );
};

export default UpdateTicketForm;