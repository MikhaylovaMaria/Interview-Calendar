import moment from "moment";

export function isBusyDay(day, events) {
  for (let i = 0; i < events.length; i++) {
    const temp = moment.unix(events[i].time);
    if (moment(day).isSame(temp, "day") && moment(day).isSame(temp, "hour"))
      return true;
  }
  return false;
}
