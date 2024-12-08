// convert word/sentence to camel case with space format,
export const toCamelCaseWithSpaces = (sentence) => {
  if (!sentence || typeof sentence != "string") {
    // if (!sentence) {
    return sentence;
  }
  return sentence
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// To truncate large sentence to specific length,
export const truncate = (str, n = 25) => {
  if (!str) {
    return "";
  }
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};

// To truncate fraction part after 2 digits, mainly used to display rates
export const displayAmount = (amount) => {
  if (!amount) {
    return amount;
  }
  // Check if the amount has a fractional part
  if (Number.isInteger(amount)) {
    return amount;
  } else {
    let amountString = amount.toString();
    let decimalIndex = amountString.indexOf(".");

    // Check if the decimal point exists and if it has at least 3 digits after it
    if (decimalIndex !== -1 && decimalIndex + 3 < amountString.length) {
      // Extract the integer and the first 2 digits of the fractional part
      let cutFraction = amountString.slice(0, decimalIndex + 3);

      return parseFloat(cutFraction);
    } else {
      return amount;
    }
  }
};

export const displayDate = (dateString) => {
  // conver date format from  (2024-07-27T10:32:23.000000Z)  to (27 Jul 2024) this format

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const getDateNDaysFromToday = (n = 0) => {
  const today = new Date();
  const nDaysLater = new Date(today);
  nDaysLater.setDate(today.getDate() + n); // Get n days later from today
  return nDaysLater.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export const formatDateToReadable = (inputDate) => {
  if (!inputDate) {
    return inputDate;
  }
  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date to "dd-Mon-yyyy"
  return `${day}-${monthNames[month - 1]}-${year}`;
};

// convert js key-value object to FormData
export const objToFormData = (obj) => {
  var formData = new FormData();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      // if the value is array, append t as array, direct append method will cast it to string
      for (var i = 0; i < obj[key].length; i++) {
        formData.append(`${key}[]`, obj[key][i]);
      }
    } else if (obj[key] !== null) formData.set(key, obj[key]);
  }
  return formData;
};

// convert js object to FormData
export const imgToBlob = async (croppedImgFile) => {
  if (croppedImgFile) {
    return await fetch(croppedImgFile).then((r) => r.blob());
  }
  return null;
};

export const getServiceNameByBookingRef = (bookingRef) => {
  if (!bookingRef) {
    return bookingRef;
  }

  const serviceList = {
    C: "rideshare",
    R: "rental",
    T: "transfer",
    H: "hotel",
    F: "restaurant",
    A: "tour",
    G: "guide",
    D: "delivery",
    N: "train",
  };

  const bookingPrefix = bookingRef.substring(0, 1);
  if (bookingPrefix) {
    return serviceList[bookingPrefix];
  }
  return bookingRef;
};
