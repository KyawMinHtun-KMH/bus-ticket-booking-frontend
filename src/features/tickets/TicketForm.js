import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllRoute,getAllRoute } from "../routes/routeSlice";
import { createTicket } from "./ticketSlice";
import { fetchAllBus, getAllBus } from "../bus/busSlice";

const TicketForm = () => {
  const [image,setImage] = useState("")
  const [typeName,setTypeName] = useState("Scania Standard")
  const [price,setPrice] = useState(0.0)
  const [depature,setDepature] = useState("")
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

const onTypeNameChange = e => setTypeName(e.target.value)
const onPriceChange = e => setPrice(e.target.value)
const onDepatureChange = e =>setDepature(e.target.value)
const onStartDateTimeChange = e =>setStartDateTime(e.target.value)
const onEndDateTimeChange = e =>setEndDateTime(e.target.value)
const onBindRouteChange = e =>setBindRoute(e.target.value)
const onImageChange = e =>setImage(e.target.files[0])

const canCreate = [typeName,price,depature,startDateTime,endDateTime,bindRoute].every(Boolean) && requestStatus === 'idle'

const index = bindRoute.indexOf('-')
const startLocation = bindRoute.substring(0,index)
const endLocation = bindRoute.substring(index+1)




  const onSubmit = (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("file",image)

    if(canCreate){
      setRequestStatus('pending')
      dispatch(createTicket({
        ticketRequest :{
        ticket : {
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
      },
      formData
      }))
      setRequestStatus("idle")
      setPrice(0.0)
      setDepature("")
      setStartDateTime("")
      setEndDateTime("")
      setTypeName("Scania Standard")
      setBindRoute("MANDALAY-YANGON")
      setImage("")
      /*navigate("/allTicket")*/
      
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
        <label htmlFor="image" className="form-label" >
          Image
        </label>
        <input type="file" className="form-control" id="image" onChange={onImageChange}/>
      </div>
      <div className="col-6">
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
