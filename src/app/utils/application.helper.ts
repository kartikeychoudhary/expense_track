export const formatDate = (millis: string | number | Date | null | undefined) => {
  if (millis === null || millis === undefined || millis === 0) {
    return 'No Data';
  }
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const convertMillisToDateFormat = (millis: number) => {
  // date in format dd MMM yy, hh:mm:ss
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
};

export const convertDateToMillis = (dateString: string): number => {
  if(dateString === 'No Data'){return 0;}
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');
    
    // Note: Months are zero-based in JavaScript Date objects, so we need to subtract 1 from the month
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    
    return date.getTime();
}

export const formatExecutionTime = (millis: number) => {
  // Ensure millis is a positive number (handle negative values if needed)
  const time = Math.abs(millis);

  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getMillisForLast = (duration:string)=>{
  const time = new Date().getTime();
  switch(duration){
    case '7_DAYS': return (time - 1000 * 60 * 60 * 24 * 7);
    case '1_MONTH': return (time - 1000 * 60 * 60 * 24 * 30);
    case '3_MONTH': return (time - 1000 * 60 * 60 * 24 * 30 * 3);
    case '1_YEAR': return (time - 1000 * 60 * 60 * 24 * 365);
    default: return time;
  }
}

export const isNullOrUndefined = (value:any):boolean => {
  return value === null || value === undefined;
}

export const isNullOrUndefinedOrEmpty = (value:any):boolean => {
  return isNullOrUndefined(value) || value === '';
}
