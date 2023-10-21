import { React, useEffect, useState } from "react";
import { fetchAllCity, getAllCity } from "../tickets/ticketSlice";
import { createRoute } from "./routeSlice";
import { useSelector,useDispatch } from "react-redux";
import { getToken } from "../auths/authSlice";
import Select from "react-select";
const RouteForm = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [requestStatus, setRequestStatus] = useState("idle");

  const cities = useSelector(getAllCity);
  const renderedOptions = cities.map((city) => ({
    value: `${String(city)}`,
    label: `${city}`,
  }));

  const onStartLocationChange = (startLocation) =>
    setStartLocation(startLocation);
  const onEndLocationChange = (endLocation) => setEndLocation(endLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCity());
  }, [dispatch]);

const token = useSelector(getToken)

useEffect(()=>{
  dispatch(fetchAllCity())
},[dispatch])

const canCreate = [startLocation,endLocation].every(Boolean) && requestStatus === "idle"

const onSubmit = (e) =>{
  e.preventDefault()
  setRequestStatus('pending')
  if(canCreate){
    dispatch(createRoute({
      route : {
      startLocation,
      endLocation,
      },
      token :String(token)
    }))

      setRequestStatus("idle");
      setStartLocation(null);
      setEndLocation(null);
    }
  };

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
                <p className="text-dark">StartLocation</p>
                <Select
                  value={startLocation}
                  onChange={onStartLocationChange}
                  options={renderedOptions}
                  isSearchable={true}
                  placeholder="From"
                />
              </div>

              <div className="col-md-5 col-12 my-2">
                <p className="text-dark">EndLocation</p>
                <Select
                  value={endLocation}
                  onChange={onEndLocationChange}
                  options={renderedOptions}
                  isSearchable={true}
                  placeholder="To"
                />
              </div>
              <div className="d-flex align-items-end justify-content-center col-md-2 col-12 my-2">
                <button onClick={onSubmit} className="btn btn-primary">
                  create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteForm;
