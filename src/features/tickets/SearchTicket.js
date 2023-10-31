import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCity } from "./ticketSlice";
import { fetchAllCity, fetchAllTicketByRoute } from "./ticketSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import classes from "./SearchTicket.module.css";
import PaymentUi from "../../components/ui/PaymentUi";
import bg1 from "./image (1).jpg";
import bg2 from "./image.jpg";
import bg3 from "./juan-encalada-6mcVaoGNz1w-unsplash.jpg";

const SearchTicket = () => {

  
  const [seatAmount, setSeatAmount] = useState(1);
  const [seatAmountText, setSeatAmountText] = useState("seat");

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [depature, setDepature] = useState("");

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with 0 if needed
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [requestStatus, setRequestStatus] = useState("idle");

  const addSeatAmount = (e) => {
    e.preventDefault();
    if (seatAmount < 4) {
      setSeatAmount(seatAmount + 1);
    }
    if (seatAmount >= 1) {
      setSeatAmountText("seats");
    } else {
      setSeatAmountText("seat");
    }
  };

  const minusSeatAmount = (e) => {
    e.preventDefault();
    if (seatAmount > 1) {
      setSeatAmount(seatAmount - 1);
    }
    if (seatAmount > 2) {
      setSeatAmountText("seats");
    } else {
      setSeatAmountText("seat");
    }
  };

  const cities = useSelector(getAllCity);
  const renderedOptions = cities.map((city) => ({
    value: `${String(city)}`,
    label: `${city}`,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCity());
  }, [dispatch]);

  const onStartLocationChange = (startLocation) =>
    setStartLocation(startLocation);
  const onEndLocationChange = (endLocation) => setEndLocation(endLocation);
  const onDepatureChange = (e) => setDepature(e.target.value);

  const canSearch =
    [startLocation, endLocation, depature, seatAmount].every(Boolean) &&
    requestStatus === "idle";

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(`#####${depature}`)

    const sIndex = renderedOptions.findIndex(
      (renderedOption) => renderedOption.value === startLocation.value
    );
    const eIndex = renderedOptions.findIndex(
      (renderedOption) => renderedOption.value === endLocation.value
    );

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
      navigate(`/searchticket/${seatAmount}/${sIndex}/${eIndex}/${depature}`);
    }
  };
  return (
    <>
     
      <div
        id="carouselExampleInterval"
        className="carousel slide position-relative"
        data-bs-ride="carousel"
      >
        {/* carousel image start  */}
        <div className="carousel-inner">
          <div className="carousel-item active" id={classes.citem} data-bs-interval="3000" >
            <img src={bg1} className="d-block w-100" alt="carousel.jpg" id={classes.cimg} />
          </div>
          <div className="carousel-item" id={classes.citem} data-bs-interval="3000">
            <img src={bg2} className="d-block w-100" alt="carousel.jpg" id={classes.cimg} />
          </div>
          <div className="carousel-item" id={classes.citem} data-bs-interval="3000">
            <img src={bg3} className="d-block w-100" alt="carousel.jpg" id={classes.cimg} />
          </div>
        </div>
        {/* carousel image end  */}
        <div className="row position-absolute translate-middle offset-6" id={classes.mmbusform}>
          <div className="container-fluid">
        
            <div className="card-header">  
              <h3 className="text-white pb-3" style={{marginLeft:"-10px"}}>Book Burmese Bus Ticket</h3>
            </div>

            <div
              className="card-body"
             
            >
              <form className="row g-3 py-2"  style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                <div className="col-md-3 col-6">
                  <p className="text-white">StartLocation</p>
                  <Select
                    value={startLocation}
                    onChange={onStartLocationChange}
                    options={renderedOptions}
                    isSearchable={true}
                    placeholder="From"
                  />
                </div>

                <div className="col-md-3 col-6">
                  <p className="text-white">EndLocation</p>
                  <Select
                    value={endLocation}
                    onChange={onEndLocationChange}
                    options={renderedOptions}
                    isSearchable={true}
                    placeholder="To"
                  />
                </div>

                <div className="col-md-2 col-6">
                  <label
                    htmlFor="Depature"
                    className="form-label text-white pb-2"
                  >
                    Depature
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="Depature"
                    value={depature}
                    onChange={onDepatureChange}
                    min={formattedDate}
                    required
                  />
                </div>

                <div className="col-lg-2 col-6">
                  <p className="text-white">SeatAmount</p>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={minusSeatAmount}
                      className="btn btn-light shadow-none border px-2"
                      id="decrement-counter"
                      name="decrement-counter"
                      disabled=""
                    >
                      <i
                        className="fa fa-minus"
                        id="decrement-icon"
                        style={{ color: "blue" }}
                      ></i>
                    </button>
                    {/*<input type="text" className="form-control" id="SeatAmount" value={seatAmount} placeholder="Seat" onChange={onSeatAmountChange} required />*/}
                    <div className="bg-white flex-grow-1 text-center border-top border-bottom pt-1">
                      <span>{seatAmount}</span>
                      <span>{seatAmountText}</span>
                    </div>
                    <button
                      onClick={addSeatAmount}
                      className="btn btn-light shadow-none border px-2"
                      id="decrement-counter"
                      name="decrement-counter"
                      disabled=""
                    >
                      <i
                        className="fa fa-plus"
                        id="decrement-icon"
                        style={{ color: "blue" }}
                      ></i>
                    </button>
                  </div>
                </div>

                <div
                  className="d-grid gap-2 col-lg-2 col-12 mt-4"
                  id={classes.searchbutton}
                >
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-danger"
                  >
                    Search now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <PaymentUi />
    </>
  );
};

export default SearchTicket;
