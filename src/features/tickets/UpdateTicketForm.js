import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getTicketById,updateTicket,deleteTicket } from './ticketSlice'
import { fetchAllBus,getAllBus } from '../bus/busSlice'
import { getAllRoute,fetchAllRoute } from '../routes/routeSlice'


const UpdateTicketForm = () => {

    const { ticketId } = useParams();
    console.log(ticketId)
    
    const existedTicket = useSelector((state) =>
        getTicketById(state,ticketId)
    )
    
    
    
    const existedStartLocation = existedTicket.route.startLocation
    const existedEndLocation = existedTicket.route.endLocation
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

      const dispatch = useDispatch()

      useEffect(()=>{
        dispatch(fetchAllBus())
      },[dispatch])
    
      const buses = useSelector(getAllBus)
      const typeNames = buses.map((bus) => bus.typeName)
      const typeNamesOption = typeNames.map((typeName) => <option
        key={typeName}
        value={typeName}
      >
        {typeName}
      </option>)

    useEffect(()=>{
    dispatch(fetchAllRoute())
  },[dispatch])

  const routes = useSelector(getAllRoute)
  const bindRoutes = routes.map((route)=>route.startLocation+"-"+route.endLocation)

  const renderedOptions = bindRoutes.map((bindRoute)=><option
    key={bindRoute}
    value={bindRoute}
  >
  {bindRoute}
  </option>)


    const [typeName,setTypeName] = useState(existedTicket?.bus.typeName)
    const [price,setPrice] = useState(existedTicket?.price)
    const [depature,setDepature] = useState(existedTicket?.depature)
    const [startDateTime,setStartDateTime] = useState(existedTicket?.startDateTime)
    const [endDateTime,setEndDateTime] = useState(existedTicket?.endDateTime)
    const [bindRoute,setBindRoute] = useState(existedBindRoute)
    const [requestStatus,setRequestStatus] = useState('idle')

    const onTypeNameChange = e => setTypeName(e.target.value)
    const onPriceChange = e => setPrice(e.target.value)
    const onDepatureChange = e =>setDepature(e.target.value)
    const onStartDateTimeChange = e =>setStartDateTime(e.target.value)
    const onEndDateTimeChange = e =>setEndDateTime(e.target.value)
    const onBindRouteChange = e =>setBindRoute(e.target.value)

    const canUpdate = [typeName,price,depature,startDateTime,endDateTime,bindRoute].every(Boolean) && requestStatus === 'idle'

    const index = bindRoute.indexOf('-')
    const startLocation = bindRoute.substring(0,index)
    const endLocation = bindRoute.substring(index+1)

    const navigate = useNavigate()

    const onUpdate=(e) =>{
        e.preventDefault()
        
        
        if(canUpdate){
            setRequestStatus("pending")
            dispatch(updateTicket({
                ticketRequest : {
                    ticket : {
                        id : existedTicket.id,
                        price,
                        depature,
                        startDateTime,
                        endDateTime
                      },
                      typeName,
                      route : {
                        startLocation,
                        endLocation
                      }
                }
            })
        )
        setRequestStatus("idle")
        navigate("/allTicket")
        }
    }

    const onDelete = (e) =>{
      e.preventDefault()
      dispatch(deleteTicket({
        ticketId
      }))
      navigate("/allTicket")
    }

  return (
    <div className='container mt-5'>
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
      
      <div className="col-12">
        <label htmlFor="depature" className="form-label">
          Depature Date
        </label>
        <input type="date" className="form-control" id="depature" value={depature} onChange={onDepatureChange} min={formattedDate}/>
      </div>
      <div className="col-12">
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
      <div className="col-md-6">
        <label htmlFor="endDateTime" className="form-label">
          End DateTime
        </label>
        <input type="datetime-local" className="form-control" id="endDateTime" value={endDateTime} onChange={onEndDateTimeChange} min={formattedDateTime}/>
      </div>
      <div className="col-md-4">
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
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
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
    </div>
  );
};

export default UpdateTicketForm;