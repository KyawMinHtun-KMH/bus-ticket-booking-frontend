import { React,useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getAllCity } from './ticketSlice'
import { fetchAllCity,fetchAllTicketByRoute } from './ticketSlice'
import { useNavigate } from 'react-router-dom'


const SearchTicket = () => {

const [startLocation,setStartLocation] = useState("")
const [endLocation,setEndLocation] = useState("")
const [depature,setDepature] = useState("")
const [seatAmount,setSeatAmount] = useState(0)
const [requestStatus,setRequestStatus] = useState('idle')

const cities = useSelector(getAllCity)
const renderedOptions = cities.map(city => <option
    key={city}
    value={city}
>
{String(city).toLowerCase()}
</option>)

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchAllCity())
},[dispatch])



const onStartLocationChange = e => setStartLocation(e.target.value)
const onEndLocationChange = e => setEndLocation(e.target.value)
const onDepatureChange = e => setDepature(e.target.value)
const onSeatAmountChange = e =>setSeatAmount(e.target.value)

const canSearch = [startLocation,endLocation,depature,seatAmount].every(Boolean) && requestStatus === 'idle'

const navigate = useNavigate()

const onSubmit = e =>{
  e.preventDefault()
  if(canSearch){
    setRequestStatus('pending')
    dispatch(fetchAllTicketByRoute({
      startLocation,
      endLocation,
      depature
    }))
    setRequestStatus("idle")
    navigate(`/searchticket/${seatAmount}`)
  }

}
  return (
    <form className="row g-3">
  
  <div className="col-md-4">
    <label htmlFor="From" className="form-label">From</label>
    <select id="From" className="form-select" value={startLocation} onChange={onStartLocationChange} required>
      {renderedOptions}
    </select>
  </div>
  
  
  
  <div className="col-md-4">
    <label htmlFor="To" className="form-label">To</label>
    <select id="To" className="form-select" value={endLocation} onChange={onEndLocationChange} required>
      {renderedOptions}
    </select>
  </div>

  <div className="col-12">
    <label htmlFor="Depature" className="form-label">Depature</label>
    <input type="date" className="form-control" id="Depature" value={depature} onChange={onDepatureChange} required/>
  </div>

  <div className="col-12">
    <label htmlFor="SeatAmount" className="form-label">SeatAmount</label>
    <input type="text" className="form-control" id="SeatAmount" value={seatAmount} placeholder="Seat" onChange={onSeatAmountChange} required />
  </div>
  
  
  <div className="col-12">
    <button type="submit" onClick={onSubmit} className="btn btn-danger">Search now</button>
  </div>
</form>
  )
}

export default SearchTicket