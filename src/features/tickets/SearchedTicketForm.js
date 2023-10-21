import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCity } from "./ticketSlice";
import { fetchAllCity, fetchAllTicketByRoute } from "./ticketSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useParams } from "react-router-dom";

const SearchedTicketForm = () => {
    const { seatAmount,start,end,date } = useParams()
    const cities = useSelector(getAllCity);
  const renderedOptions = cities.map((city) => ({
    value: `${String(city)}`,
    label: `${city}`,
  }));
  const [seat, setSeat] = useState(seatAmount);
  const [seatAmountText, setSeatAmountText] = useState(seatAmount>1?"seats":"seat");

  const [startLocation, setStartLocation] = useState(renderedOptions[start]);
  const [endLocation, setEndLocation] = useState(renderedOptions[end]);
  const [depature, setDepature] = useState(date);
  const [requestStatus, setRequestStatus] = useState("idle");

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if needed
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const addSeatAmount = (e) => {
    e.preventDefault();
    if (seat < 4) {
      setSeat(seat + 1);
    }
    if (seat >= 1) {
      setSeatAmountText("seats");
    } else {
      setSeatAmountText("seat");
    }
  };

  const minusSeatAmount = (e) => {
    e.preventDefault();
    if (seat > 1) {
      setSeat(seat - 1);
    }
    if (seat > 2) {
      setSeatAmountText("seats");
    } else {
      setSeatAmountText("seat");
    }
  };

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCity());
  }, [dispatch]);

  const onStartLocationChange = (startLocation) =>
    setStartLocation(startLocation);
  const onEndLocationChange = (endLocation) =>
    setEndLocation(endLocation);
  const onDepatureChange = (e) => setDepature(e.target.value);

  const canSearch =
    [startLocation, endLocation, depature, seat].every(Boolean) &&
    requestStatus === "idle";

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(`#####${depature}`)
    const sIndex = renderedOptions.findIndex((renderedOption)=>renderedOption.value === startLocation.value)
    const eIndex = renderedOptions.findIndex((renderedOption)=>renderedOption.value === endLocation.value)

    if (canSearch) {
      setRequestStatus("pending");
      dispatch(
        fetchAllTicketByRoute({
          startLocation: String(startLocation.value),
          endLocation: String(endLocation.value),
          depature,
        })
      );
      setRequestStatus("idle");
      navigate(`/searchticket/${seat}/${sIndex}/${eIndex}/${depature}`);
      //   console.log(`#####${depature}`)
      //   console.log("#3#"+startLocation.value)
      // console.log("333"+endLocation.value)
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header py-3 bg-light">Search Tickets</div>
        <div className="card-body">
        <form className="row g-3">
  
  <div className="col-md-3 col-6">
    
  <p className="text-dark">StartLocation</p>
    <Select 
      value={startLocation}
      onChange={onStartLocationChange}
      options={renderedOptions}
      isSearchable={true}
      placeholder="From"
    />
  </div>
  
  
  
  <div className="col-md-3 col-6">
  <p className="text-dark">EndLocation</p>
  <Select 
      value={endLocation}
      onChange={onEndLocationChange}
      options={renderedOptions}
      isSearchable={true}
      placeholder="To"
    />
  </div>

  <div className="col-md-2 col-6">
    <label htmlFor="Depature" className="form-label text-dark pb-2">Depature</label>
    <input type="date" className="form-control" id="Depature" value={depature} onChange={onDepatureChange} min={formattedDate} required/>
  </div>

  <div className="col-lg-2 col-6">
    <p className="text-dark">SeatAmount</p>
    <div className='d-flex justify-content-center'>
      <button onClick={minusSeatAmount} className="btn btn-light shadow-none border px-2" id="decrement-counter" name="decrement-counter" disabled="">
        <i className="fa fa-minus" id="decrement-icon" style={{color: 'blue'}}></i>
      </button>
      {/*<input type="text" className="form-control" id="SeatAmount" value={seatAmount} placeholder="Seat" onChange={onSeatAmountChange} required />*/}
      <div className="bg-white flex-grow-1 text-center border-top border-bottom">
        <span>{seat}</span>
        <span>{seatAmountText}</span>
      </div>
      <button onClick={addSeatAmount} className="btn btn-light shadow-none border px-2" id="decrement-counter" name="decrement-counter" disabled="">
        <i className="fa fa-plus" id="decrement-icon" style={{color: 'blue'}}></i>
      </button>
    </div>
  </div>
  
  
  <div className="d-grid gap-2 col-lg-2 col-12 mt-4" style={{padding : '32px'}}>
    <button type="submit" onClick={onSubmit} className="btn btn-danger">Search now</button>
  </div>
</form>
        </div>
      </div>
    </div>
  );
};

export default SearchedTicketForm;
