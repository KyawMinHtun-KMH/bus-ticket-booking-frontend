import { React,useEffect,useState } from "react";
import { fetchAllCity,getAllCity } from "../tickets/ticketSlice";
import { createRoute } from "./routeSlice";
import { useSelector,useDispatch } from "react-redux";
const RouteForm = () => {

  const [startLocation,setStartLocation] = useState("AUNGPAN")
  const [endLocation,setEndLocation] = useState("AUNGPAN")
  const [requestStatus,setRequestStatus] = useState('idle')

  const cities = useSelector(getAllCity)
  const renderedOptions = cities.map(city => <option
    key={city}
    value={city}
  >
    {String(city).toLowerCase()}
  </option>)

  const onStartLocationChange = (e) => setStartLocation(e.target.value)
  const onEndLocationChange = (e) => setEndLocation(e.target.value)

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchAllCity())
},[dispatch])

const canCreate = [startLocation,endLocation].every(Boolean) && requestStatus === "idle"

const onSubmit = (e) =>{
  e.preventDefault()
  setRequestStatus('pending')
  if(canCreate){
    dispatch(createRoute({
      startLocation,
      endLocation
    }))

    setRequestStatus("idle")
    setStartLocation("")
    setEndLocation("")
  }
}


  return (
    <div className="accordion my-5 " id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#createRoute"
            aria-expanded="false"
            aria-controls="createRoute"
          >
            <h5 className="text-success">Create Route</h5> 
          </button>
        </h2>
        <div
          id="createRoute"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            
                <form className="row">
                  <div className="col-md-5 col-12 my-2">
                    <label htmlFor="startLocation" className="form-label">
                      Start Location
                    </label>
                    <select id="startLocation" className="form-select" value={startLocation} onChange={onStartLocationChange} required>
                      {renderedOptions}
                    </select>
                  </div>
                  <div className="col-md-5 col-12 my-2">
                    <label htmlFor="endLocation" className="form-label">
                      EndLocation
                    </label>
                    <select id="endLocation" className="form-select" value={endLocation} onChange={onEndLocationChange} required>
                      {renderedOptions}
                    </select>
                  </div>
                  <div className="d-flex align-items-end justify-content-center col-md-2 col-12 my-2">
                     <button onClick={onSubmit} className="btn btn-primary">create</button>
                  </div>
                </form>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteForm;
