import React from "react";
import styled from "styled-components";

// const GridWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(8, auto);
//   grid-template-rows: repeat(24, auto);
//   gap: 1px;
//   background-color: #e6e6e6;
//   `;

// const CellWrapper = styled.div`
//   min-width: 140px;
//   min-height: 80px;
//   background-color: #ffffff;
//   color: #c0c0c0;
// `;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(24, auto);
  background-color: #e6e6e6;
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: 80px;
  background-color: #ffffff;
  color: #c0c0c0;
  display: grid;
  border-right: ${(props) =>
    props.index % 8 === 0 ? "none" : "2px solid #e6e6e6"};
  border-top: ${(props) =>
    props.index > 8 && props.index % 8 !== 0 ? "1px solid #e6e6e6" : "none"};
`;

const RowInCell = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const DayWrapper = styled.div`
  height: 33px;
  // width: 33px;
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

const CalendarGrid = ({ startDayWeek }) => {
  const daysArray = getDaysArray(startDayWeek);

  // return (
  //   <GridWrapper>
  //     {daysArray.map((i) => (
  //       <CellWrapper key={i}>
  //         <RowInCell justifyContent={"flex-end"}>
  //           <DayWrapper>{typeof i !== "object" && i}</DayWrapper>
  //         </RowInCell>
  //       </CellWrapper>
  //     ))}
  //   </GridWrapper>
  // );
  return (
    <GridWrapper>
      {daysArray.map((i, index) => (
        <CellWrapper key={i} index={index}>
          <RowInCell justifyContent={"flex-end"}>
            <DayWrapper>{typeof i !== "object" && i}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};
export default CalendarGrid;
