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
  width: clamp(20px, (70vw + 70vh) / 7, 100px);
  height: clamp(40px, (70vw + 70vh) / 7, 80px);
  background-color: #ffffff;
  color: #c0c0c0;
  display: grid;
  border-right: ${(props) =>
    props.index % 8 === 0 ? "none" : "1px solid #e6e6e6"};
  border-top: ${(props) =>
    props.index > 8 && props.index % 8 !== 0 ? "1px solid #e6e6e6" : "none"};
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
  justify-content: center;
`;

const ShowDayWrapper = styled("div")`
  background-color: #ebecff;
  margin: 2%;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  grid-area: 1 / 1 / span 1 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function getDaysArray(startDay) {
  let resultArray = [];
  let day = startDay.clone();
  for (let i = 0; i < 192; i++) {
    if (i % 8 === 0) {
      i / 8 < 10
        ? resultArray.push(`0${i / 8}:00`)
        : resultArray.push(`${i / 8}:00`);
    } else {
      resultArray.push(day.clone());
      day.add(1, "hour");
    }
  }

  return resultArray;
}

function isBusyDay(day, events) {
  for (let i = 0; i < events.length; i++) {
    const temp = moment.unix(events[i].content.time);
    if (moment(day).isSame(temp, "day") && moment(day).isSame(temp, "hour"))
      return true;
  }
  return false;
}

const CalendarGrid = ({ startDayWeek, events }) => {
  const daysArray = getDaysArray(startDayWeek);

  return (
    <GridWrapper>
      {daysArray.map((i, index) => (
        <CellWrapper key={i} index={index}>
          {events?.length > 0 && isBusyDay(i, events) ? (
            <ShowDayWrapper>
              <RowInCell justifyContent={"flex-end"}>
                <DayWrapper>{typeof i !== "object" && i}</DayWrapper>
              </RowInCell>
            </ShowDayWrapper>
          ) : (
            <RowInCell justifyContent={"flex-end"}>
              <DayWrapper>{typeof i !== "object" && i}</DayWrapper>
            </RowInCell>
          )}
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};
export default CalendarGrid;
