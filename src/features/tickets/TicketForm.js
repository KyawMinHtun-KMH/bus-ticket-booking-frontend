import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllRoute,getAllRoute } from "../routes/routeSlice";
import { createTicket } from "./ticketSlice";
import { fetchAllBus, getAllBus } from "../bus/busSlice";
import { useNavigate } from "react-router-dom";

const TicketForm = () => {
  
  const [imageURL,setImageURL] = useState("")
  const [typeName,setTypeName] = useState("Scania Standard")
  const [price,setPrice] = useState(0.0)
  // const [depature,setDepature] = useState("")
  const [startDateTime,setStartDateTime] = useState("")
  const [endDateTime,setEndDateTime] = useState("")
  const [bindRoute,setBindRoute] = useState("MANDALAY-YANGON")
  const [requestStatus,setRequestStatus] = useState('idle')

  function formatDateToISOStringWithoutSecondsAndMilliseconds(date) {
    const isoString = date.toISOString();
    // Remove the seconds and milliseconds part
    return isoString.slice(0, 16);
  }
  
  
  const today = new Date();
  const formattedDateTime = formatDateToISOStringWithoutSecondsAndMilliseconds(today);

  // const year = today.getFullYear();
  // const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with 0 if needed
  // const day = String(today.getDate()).padStart(2, '0');

  // const formattedDate = `${year}-${month}-${day}`;


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

const onTypeNameChange = e => setTypeName(e.target.value)
const onPriceChange = e => setPrice(e.target.value)
// const onDepatureChange = e =>setDepature(e.target.value)
const onStartDateTimeChange = e =>setStartDateTime(e.target.value)
const onEndDateTimeChange = e =>setEndDateTime(e.target.value)
const onBindRouteChange = e =>setBindRoute(e.target.value)
const onImageURLChange = e =>setImageURL(e.target.value)

const canCreate = [typeName,imageURL,price/*,depature*/,startDateTime,endDateTime,bindRoute].every(Boolean) && requestStatus === 'idle'

const index = bindRoute.indexOf('-')
const startLocation = bindRoute.substring(0,index)
const endLocation = bindRoute.substring(index+1)

const depature = startDateTime.slice(0,10)


  const navigate = useNavigate()

  const onSubmit = (e) =>{
    e.preventDefault()

    if(canCreate){
      setRequestStatus('pending')
      dispatch(createTicket({
        ticketRequest :{
        ticket : {
          price,
          imageURL,
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
      
      }))
      setRequestStatus("idle")
      navigate("/")
      
    }
  }


  return (
    <div className="card">
      <div className="card-body">
      <h4 className="card-title text-success">Create ticket</h4>
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
      <div className="col-md-6">
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
      {/* <div className="col-6">
        <label htmlFor="depature" className="form-label">
          Depature Date
        </label>
        <input type="date" className="form-control" id="depature" value={depature} onChange={onDepatureChange} min={formattedDate}/>
      </div> */}
      <div className="col-md-6">
        <label htmlFor="endDateTime" className="form-label">
          End DateTime
        </label>
        <input type="datetime-local" className="form-control" id="endDateTime" value={endDateTime} onChange={onEndDateTimeChange} min={formattedDateTime}/>
      </div>
      <div className="col-md-6">
        <label htmlFor="image" className="form-label" >
          Image
        </label>
        <input type="text" className="form-control" id="image" value={imageURL} onChange={onImageURLChange}/>
      </div>
      <div className="col-md-4">
        <label htmlFor="route" className="form-label">
          Route
        </label>
        <select id="route" className="form-select" value={bindRoute} onChange={onBindRouteChange}>
          {renderedOptions}
        </select>
      </div>

      <div className="col-12">
        <button type="submit" disabled={!canCreate} onClick={onSubmit} className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default TicketForm;
