import { React,useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllCity } from './ticketSlice'
import { fetchAllCity,fetchAllTicketByRoute } from './ticketSlice'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import classes from './SearchTicket.module.css'


const SearchTicket = () => {

  const [seatAmount,setSeatAmount] = useState(1)
  const [seatAmountText,setSeatAmountText] = useState("seat")

const [startLocation,setStartLocation] = useState(null)
const [endLocation,setEndLocation] = useState(null)
const [depature,setDepature] = useState("")

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with 0 if needed
const day = String(today.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;


const [requestStatus,setRequestStatus] = useState('idle')

const addSeatAmount = (e) =>{
  e.preventDefault()
  if(seatAmount<4){
    setSeatAmount(seatAmount+1)
  }
  if(seatAmount>=1){
    setSeatAmountText("seats")
  }else{
    setSeatAmountText("seat")
  }
}

const minusSeatAmount = (e) =>{
  e.preventDefault()
  if(seatAmount>1){
    setSeatAmount(seatAmount-1)
  }
  if(seatAmount>2){
    setSeatAmountText("seats")
  }else{
    setSeatAmountText("seat")
  }
}

const cities = useSelector(getAllCity)
const renderedOptions = cities.map(city => ({
  value : `${String(city)}`,label : `${city}`
}))


const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchAllCity())
},[dispatch])






const onStartLocationChange = startLocation => setStartLocation(startLocation)
const onEndLocationChange = endLocation => setEndLocation(endLocation)
const onDepatureChange = e => setDepature(e.target.value)


const canSearch = [startLocation,endLocation,depature,seatAmount].every(Boolean) && requestStatus === 'idle'

const navigate = useNavigate()


const onSubmit = e =>{
  e.preventDefault()
  //console.log(`#####${depature}`)
  
  
  if(canSearch){
    setRequestStatus('pending')
    dispatch(fetchAllTicketByRoute({
      startLocation : String(startLocation.value),
      endLocation : String(endLocation.value),
      depature
    }))
    setRequestStatus("idle")
    navigate(`/searchticket/${seatAmount}`)
    console.log(`#####${depature}`)
    console.log("#3#"+startLocation.value)
  console.log("333"+endLocation.value)
  }

}
  return (
    <div id={classes.background} className='col-12' /*style={{backgroundImage :"url(https://t3.ftcdn.net/jpg/05/70/65/04/240_F_570650424_yUIcZ8w0QHRe5aXwwk48LjnJ7u326Kj4.jpg)",backgroundRepeat:"no-repeat",height:"50vh",backgroundSize:"cover"}}*/>
    <div className='container'>
      <div className='row '>
        <h3 className='col-12 my-5 text-white'>Book Burmese Bus Ticket</h3>
      </div>
      
        <div className='card-body' style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
    <form className="row g-3">
  
  <div className="col-md-3 col-6">
    
  <label className="form-label text-white">StartLocation</label>
    <Select 
      value={startLocation}
      onChange={onStartLocationChange}
      options={renderedOptions}
      isSearchable={true}
      placeholder="From"
    />
  </div>
  
  
  
  <div className="col-md-3 col-6">
  <label className="form-label text-white">EndLocation</label>
  <Select 
      value={endLocation}
      onChange={onEndLocationChange}
      options={renderedOptions}
      isSearchable={true}
      placeholder="To"
    />
  </div>

  <div className="col-md-2 col-6">
    <label htmlFor="Depature" className="form-label text-white">Depature</label>
    <input type="date" className="form-control" id="Depature" value={depature} onChange={onDepatureChange} min={formattedDate} required/>
  </div>

  <div className="col-lg-2 col-6">
    <label htmlFor="SeatAmount" className="form-label text-white">SeatAmount</label>
    <div className='d-flex justify-content-center'>
      <button onClick={minusSeatAmount} className="btn btn-light shadow-none border px-2" id="decrement-counter" name="decrement-counter" disabled="">
        <i className="fa fa-minus" id="decrement-icon" style={{color: 'blue'}}></i>
      </button>
      {/*<input type="text" className="form-control" id="SeatAmount" value={seatAmount} placeholder="Seat" onChange={onSeatAmountChange} required />*/}
      <div className="bg-white flex-grow-1 text-center border-top border-bottom">
        <span>{seatAmount}</span>
        <span>{seatAmountText}</span>
      </div>
      <button onClick={addSeatAmount} className="btn btn-light shadow-none border px-2" id="decrement-counter" name="decrement-counter" disabled="">
        <i className="fa fa-plus" id="decrement-icon" style={{color: 'blue'}}></i>
      </button>
    </div>
  </div>
  
  
  <div className="d-grid gap-2 col-lg-2 col-12" id={classes.searchbutton}>
    <button type="submit" onClick={onSubmit} className="btn btn-danger">Search now</button>
  </div>
</form>
</div>
</div>
</div>
  )
}

export default SearchTicket