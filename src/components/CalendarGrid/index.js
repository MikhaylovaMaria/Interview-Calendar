import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { getStartDayWeek } from "../../store/currentDay";
import { getCurrentEvents } from "../../store/events";

const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(24, auto);
  background-color: #e6e6e6;
  position: relative;
  width: 100vw;
  height: 75vh;
  overflow-y: scroll;
  @media (min-width: 740px) {
    width: 740px;
  }
`;

const CellWrapper = styled.div`
  width: 12vw;
  height: clamp(40px, (100vw)/8, 72.5px);
  background-color: #ffffff;
  color: #c0c0c0;
  display: grid;
  border-right: "2px solid #e6e6e6";
  border-top: ${(props) =>
    props.index > 0 && props.index % 8 !== 0 ? "2px solid  #e6e6e6" : "none"};
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
  background-color: ${(props) =>
    props.$mode === "active" ? "#b3b7ff" : "#ebecff"};
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

const CalendarGrid = ({
  setButtonDelete,
  activeButton,
  setActiveButton,
  currentButtonClick,
}) => {
  const startDayWeek = useSelector(getStartDayWeek());
  const daysArray = getDaysArray(startDayWeek);
  const events = useSelector(getCurrentEvents());

  return (
    <GridWrapper>
      {daysArray.map((i, index) => (
        <CellWrapper key={i} index={index}>
          {events?.length > 0 && isBusyDay(i, events) ? (
            <ShowDayWrapper
              $mode={moment(i).unix() === activeButton ? "active" : "none"}
              onClick={() => currentButtonClick(moment(i).unix())}
            >
              <RowInCell>
                <DayWrapper>{i.length === 5 && i}</DayWrapper>
              </RowInCell>
            </ShowDayWrapper>
          ) : (
            <RowInCell
              onClick={() => {
                setButtonDelete(false);
                setActiveButton(false);
              }}
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
