/**
 * Convert Date to Json format ISO but not UTC
 * @param date 
 * @returns 
 */
export const toJsonString = (date:Date) :string => {
  function pad(number:number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate())
  );
};
