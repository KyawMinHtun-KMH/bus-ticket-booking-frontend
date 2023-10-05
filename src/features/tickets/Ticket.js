import React from 'react'
import Card from '../../components/ui/Card';

const Ticket = ({ticket}) => {

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
    
  return (
    <Card>
    <li>
        <div className='col-md-6 col-12'>
        <h4>{`${dateTimeToTime(ticket.startDateTime)} - ${ticket.busType.typeName}`}</h4>
          <h6>{`${ticket.route.startLocation} - ${ticket.route.endLocation}`}</h6>
          <p>{`Departs : ${dateTimeToDate(ticket.startDateTime)}, ${dateTimeToTime(ticket.startDateTime)}`}</p>
          <p>{`Arrives : ${dateTimeToDate(ticket.endDateTime)}, ${dateTimeToTime(ticket.endDateTime)}`}</p>
        </div>
    </li>
    </Card>
  )
}

export default Ticket