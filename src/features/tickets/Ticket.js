import React from 'react'
import Card from '../../components/ui/Card';
import { useParams,useNavigate } from 'react-router-dom';
import { imagePath } from '../config/pathConfig';
const Ticket = ({ticket}) => {

  const { seatAmount } = useParams()

function dateTimeToTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let hour = 0;
    if (hours > 12) {
        hour = hours-12; 
    }else{
        hour = hours;
    }

    const dayNight = hours<12 ? 'AM' : 'PM' ;

    return `${hour}:${minutes} ${dayNight}`
}

function getMonthName(monthNumber) {
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    if (monthNumber >= 0 && monthNumber <= 11) {
      return monthNames[monthNumber];
    } else {
      return 'Invalid Month';
    }
  }
  

function dateTimeToDate(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth());
    const onlyDate = date.getDate();
    return `${year} ${month} ${onlyDate}`
}

const totalPrice = seatAmount*(ticket.price)
const navigate = useNavigate()

const canUpdate = (e)=>{
  e.preventDefault()
  navigate(`/ticket/update/${ticket.id}`)
}
    
  return (
    <Card>
    <li>
      <div className='row'>
        <div className='col-md-7'>
          <img src={`${imagePath}${ticket.id}.jpg`} alt='ticket.jpg' style={{width : "500px",height : "300px"}}/>
        </div>

        <div className='col-md-5 col-12 ms-auto'>
        <h4>{`${dateTimeToTime(ticket.startDateTime)} - ${ticket.bus.typeName}`}</h4>
          <h6>{`${ticket.route.startLocation} - ${ticket.route.endLocation}`}</h6>
          <p>{`Departs : ${dateTimeToDate(ticket.startDateTime)}, ${dateTimeToTime(ticket.startDateTime)}`}</p>
          <p>{`Arrives : ${dateTimeToDate(ticket.endDateTime)}, ${dateTimeToTime(ticket.endDateTime)}`}</p>
          <h4 className='text-success'>{`MMK ${totalPrice}`}</h4>
          <p>{`${seatAmount} seat x ${ticket.price}`}</p>
          <button className='btn btn-primary me-1'>Select Seats</button>
          <button onClick={canUpdate} className='btn btn-primary'>Update</button>
          
        </div>
        
        {/*<div className='col-md-2 col-12 '>
          
        </div>*/}
      </div>
    </li>
    </Card>
  )
}

export default Ticket