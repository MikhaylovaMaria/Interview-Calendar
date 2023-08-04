import moment from "moment";

export function getDaysArray(startDay) {
  let resultArray = [];
  let day = startDay.clone();
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 8; j++) {
      if (j === 0) {
        i < 10 ? resultArray.push(`0${i}:00`) : resultArray.push(`${i}:00`);
      } else {
        const temp = day.clone();
        resultArray.push(moment(temp));
        day.add(1, "day");
      }
    }
    day = startDay.clone();
    day.add(i + 1, "hour");
  }

  return resultArray;
}
