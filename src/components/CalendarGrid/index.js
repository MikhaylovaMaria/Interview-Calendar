import React from "react";
import styled from "styled-components";
import moment from "moment";

const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(24, auto);
  background-color: #e6e6e6;
  position: relative;
  width: auto;
  @media (min-width: 740px) {
    width: 740px;
  }
`;

const CellWrapper = styled.div`
  width: clamp(20px, (100vw + 100vh) / 8, 92.5px);
  height: clamp(40px, (100vw + 100vh) / 8, 72.5px);
  background-color: #ffffff;
  color: #c0c0c0;
  display: grid;
  border-right: ${(props) =>
    props.index % 8 === 0 ? "none" : "1px solid #e6e6e6"};
  border-top: ${(props) =>
    props.index > 8 && props.index % 8 !== 0 ? "1px solid #e6e6e6" : "none"};

  @media (min-width: 740px) {
    width: 92.5px;
  }
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justifyсontent: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const DayWrapper = styled.div`
  height: 0px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const ShowDayWrapper = styled("button")`
  background-color: #ebecff;
  margin: 2%;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  grid-area: 1 / 1 / span 1 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

function getDaysArray(startDay) {
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

function isBusyDay(day, events) {
  for (let i = 0; i < events.length; i++) {
    const temp = moment.unix(events[i].time);
    if (moment(day).isSame(temp, "day") && moment(day).isSame(temp, "hour"))
      return true;
  }
  return false;
}

const CalendarGrid = ({ startDayWeek, events, setButtonDelete }) => {
  const daysArray = getDaysArray(startDayWeek);
  console.log(daysArray);

  return (
    <GridWrapper>
      {daysArray.map((i, index) => (
        <CellWrapper key={i} index={index}>
          {events?.length > 0 && isBusyDay(i, events) ? (
            <ShowDayWrapper onClick={() => setButtonDelete(true)}>
              <RowInCell justifyContent={"flex-end"}>
                <DayWrapper>{i.length === 5 && i}</DayWrapper>
              </RowInCell>
            </ShowDayWrapper>
          ) : (
            <RowInCell
              onClick={() => setButtonDelete(false)}
              justifyContent={"flex-end"}
            >
              <DayWrapper>{i.length === 5 && i}</DayWrapper>
            </RowInCell>
          )}
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};
export default CalendarGrid;
