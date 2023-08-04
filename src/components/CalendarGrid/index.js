import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { getStartDayWeek } from "../../store/currentDay";
import { getCurrentEvents } from "../../store/events";
import { getDaysArray } from "../../helper/gettingDaysArray";
import { isBusyDay } from "../../helper/eventsInDay";

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
    props.index > 8 && props.index % 8 !== 0 ? "2px solid  #e6e6e6" : "none"};
  @media (min-width: 740px) {
    width: 92.5px;
    border-right: ${(props) =>
      props.index % 8 === 0 ? "none" : "2px solid #e6e6e6"};
   
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justifyсontent: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const DayWrapper = styled.div`
  height: 0px;
  margin-right: 5px;
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

const TextWrapper = styled("span")`
  font-size: 1.5vh;
  @media (min-width: 740px) {
    font-size: 3.5vh;
  }
`;

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
            />
          ) : (
            <RowInCell
              onClick={() => {
                setButtonDelete(false);
                setActiveButton(false);
              }}
            >
              <DayWrapper>
                <TextWrapper>{i.length === 5 && i}</TextWrapper>
              </DayWrapper>
            </RowInCell>
          )}
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};
export default CalendarGrid;
