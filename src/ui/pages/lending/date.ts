const dateFormat = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = ("0"+(date.getMonth()+1)).slice(-2);
  const dd = ("0"+date.getDate()).slice(-2);
  return {year: yyyy, month: mm, day: dd};
}

const toNumber = (checkoutDate: string) => {
  const year = Number(checkoutDate.slice(0, 4));
  const month = Number(checkoutDate.slice(5, 7)) -1;
  const day = Number(checkoutDate.slice(8,10));
  return {year: year, month: month, day: day}
}


export const today = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const formatData = dateFormat(today);
  return formatData.year + '-' + formatData.month + '-' + formatData.day;
}

export const maxCheckoutDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 7)
  const formatData = dateFormat(today);
  return formatData.year + '-' + formatData.month + '-' + formatData.day;
}

export const minReturnDate = (checkoutDate: string) => {
  const data = toNumber(checkoutDate);
  const toDate = new Date(data.year, data.month, data.day);
  toDate.setDate(toDate.getDate() + 1);
  const formatData = dateFormat(toDate);
  return formatData.year + '-' + formatData.month + '-' + formatData.day;
}

export const returnDate = (checkoutDate: string) => {
  const data = toNumber(checkoutDate);
  const toDate = new Date(data.year, data.month, data.day);
  toDate.setDate(toDate.getDate() + 14);
  const formatData = dateFormat(toDate);
  return formatData.year + '-' + formatData.month + '-' + formatData.day;
}

export const dayCheck = (day: string) => {
  const data = toNumber(day);
  const toDate = new Date(data.year, data.month, data.day);
  const week = toDate.getDay();
  if(week === 0 || week === 6) {
    return false;
  } else {
    return true;
  }
}