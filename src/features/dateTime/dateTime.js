export function dateTimeToTime(dateTime) {
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

export function getMonthName(monthNumber) {
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
  

export function dateTimeToDate(dateTime) {
    const date = new Date(dateTime);
    const month = getMonthName(date.getMonth());
    const onlyDate = date.getDate();
    return `${month} ${onlyDate}`
} 