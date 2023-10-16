import React from 'react'
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';

const Ticket = ({ticket}) => {

function dateTimeToTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = String(minutes).padStart(2, '0')
    let hour = 0;
    if (hours > 12) {
        hour = hours-12; 
    }else{
        hour = hours;
    }

    const dayNight = hours<12 ? 'AM' : 'PM' ;

    return `${hour}:${formattedMinutes} ${dayNight}`
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

  return (
    <Card>
    <li>
        <div className='col-md-6 col-12'>
        <h4>{`${dateTimeToTime(ticket.startDateTime)} - ${ticket.bus.typeName}`}</h4>
          <h6>{`${ticket.route.startLocation} - ${ticket.route.endLocation}`}</h6>
          <p>{`Departs : ${dateTimeToDate(ticket.startDateTime)}, ${dateTimeToTime(ticket.startDateTime)}`}</p>
          <p>{`Arrives : ${dateTimeToDate(ticket.endDateTime)}, ${dateTimeToTime(ticket.endDateTime)}`}</p>
          <Link to={`/ticketOrders/${ticket?.id}`} className='btn btn-primary mt-2' >
            <span className='text-my text-bold'>Orders</span>
          </Link>
          <Link to={`/selectSeat/${ticket?.id}`} className='btn btn-primary mt-2' >
            <span className='text-my text-bold'>Select Seat</span>
          </Link>
          </div>
    </li>
    </Card>
  )
}

export default Ticket
