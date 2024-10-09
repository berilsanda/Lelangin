export default function combineDateTime(date: string, time: string) {
  let newDate = new Date(date);
  let newTime = new Date(time);

  newDate.setHours(newTime.getHours());
  newDate.setMinutes(newTime.getMinutes());
  newDate.setSeconds(newTime.getSeconds());
  newDate.setMilliseconds(newTime.getMilliseconds());

  return newDate;
}
