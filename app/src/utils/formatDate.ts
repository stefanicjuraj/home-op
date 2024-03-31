export const formatDateInput = (date: Date | { seconds: number }): string => {
  if (!date) return "";

  const jsDate = date instanceof Date ? date : new Date(date.seconds * 1000);

  const year = jsDate.getFullYear();
  const month = jsDate.getMonth() + 1;
  const day = jsDate.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay}/${formattedMonth}/${year}`;
};
