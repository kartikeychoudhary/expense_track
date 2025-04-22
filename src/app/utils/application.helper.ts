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

const sortQuarterlyStrings = (quarterlyStrings: string[]): string[] =>{
  const monthOrder: { [key: string]: number } = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };

  return quarterlyStrings.sort((a, b) => {
    const [monthAStart, monthAEnd, yearA] = a.split(/[- ]/);
    const [monthBStart, monthBEnd, yearB] = b.split(/[- ]/);

    const yearANum = parseInt(yearA, 10);
    const yearBNum = parseInt(yearB, 10);

    if (yearANum !== yearBNum) {
      return yearANum - yearBNum;
    }

    const monthAStartNum = monthOrder[monthAStart.toLowerCase()];
    const monthBStartNum = monthOrder[monthBStart.toLowerCase()];

    return monthAStartNum - monthBStartNum;
  });
}

const sortMonthYearStrings = (monthYearStrings: string[]): string[] => {
  const monthOrder: { [key: string]: number } = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  return monthYearStrings.sort((a, b) => {
    const [monthA, yearA] = a.split(" ");
    const [monthB, yearB] = b.split(" ");

    const yearANum = parseInt("20" + yearA, 10); // Assuming 2-digit year refers to 20xx
    const yearBNum = parseInt("20" + yearB, 10);

    if (yearANum !== yearBNum) {
      return yearANum - yearBNum;
    }

    const monthANum = monthOrder[monthA.toLowerCase()];
    const monthBNum = monthOrder[monthB.toLowerCase()];

    return monthANum - monthBNum;
  });
}

export const sortedDateString = (data:string[], format):string[] => {
  if(format === 'quarter'){
    return sortQuarterlyStrings(data);
  }else if(format === 'day'){
    // dd MMM yy
    return data.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }else if(format === 'month'){
    return sortMonthYearStrings(data);
  }else if(format === 'year'){
    return data.sort((a, b) => {
      const yearA = parseInt(a, 10);
      const yearB = parseInt(b, 10);
      return yearA - yearB;
    });
  }
  return data;
}

/**
 * Formats a number with commas as thousands separators and appends a currency symbol at the end.
 *
 * @param amount The number to format.
 * @param currencySymbol The currency symbol string (e.g., "$", "€", "₹") to append.
 * @returns A string with the number formatted with commas and the currency symbol appended, separated by a space.
 * Example: 12345.67 -> "12,345.67 $"
 */
export const formatNumberWithCurrencySuffix = (amount: number, currencySymbol: string): string => {
  const currencyString = currencySymbol ? ' ' + currencySymbol : '';

  // Validate input - ensure amount is a finite number
  if (typeof amount !== 'number' || !isFinite(amount)) {
    console.error("Invalid input: 'amount' must be a finite number.");
    // Return a default or throw an error, depending on desired behavior
    return `NaN${currencyString}`;
  }

  // Use Intl.NumberFormat for robust number formatting.
  // We specify 'en-US' locale to guarantee the use of commas as thousands separators
  // and a period as the decimal separator, regardless of the user's system locale.
  // 'style: decimal' formats the number plainly, allowing us to append the symbol manually.
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    // You can uncomment and adjust these if you need specific decimal place handling:
    // minimumFractionDigits: 2, // Always show at least 2 decimal places
    // maximumFractionDigits: 2, // Show no more than 2 decimal places
  });

  // Format the number part
  const formattedNumber = numberFormatter.format(amount);

  // Concatenate the formatted number, a space, and the currency symbol
  return `${formattedNumber}${currencyString}`;
}

export const generateRandomColorArray = (length: number): string[] => {
  const colors: string[] = [];
  const letters = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    let color = '#';
    for (let j = 0; j < 6; j++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
}

export const generatePieChartColors = (length: number): string[] => {
  if (length <= 0) {
    return [];
  }

  const colors: string[] = [];
  const saturation = 0.7;
  const lightness = 0.6;
  const hueIncrement = 360 / length;

  for (let i = 0; i < length; i++) {
    const hue = i * hueIncrement;
    colors.push(hslToHex(hue, saturation, lightness));
  }

  return colors;
}

const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}