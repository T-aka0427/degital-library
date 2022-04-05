export const today = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const yyyy = today.getFullYear();
  const mm = ("0"+(today.getMonth()+1)).slice(-2);
  const dd = ("0"+today.getDate()).slice(-2);
  return yyyy + '-' + mm + '-' + dd;
}

export const editDate = (date: string) => {
  const yyyy = Number(date.slice(0, 4));
  const mm = date.slice(5, 7);
  const dd = date.slice(8, 10);
  return yyyy + '-' + mm + '-' + dd;
}