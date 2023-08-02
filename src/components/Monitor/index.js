import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  height: 15vh;
`;

const TextWrapper = styled("span")`
  font-size: 12px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(3, auto);
  grid-gap: 1px;
  background-color: #f6f6f6;
`;

const CellWrapper = styled.div`
  width: 140px;
  background-color: #f6f6f6;
  color: #030303;
  text-align: center;
`;
const ButtonWrapperRight = styled("button")`
  border: unset;
  background-color: #f6f6f6;
  color: #ff3131;
  height: 20px;
  grid-area: 3 / 8 / 4 / 9;
  font-size: x-large;
`;
const ButtonWrapperLeft = styled("button")`
  border: unset;
  background-color: #f6f6f6;
  color: #ff3131;
  height: 20px;
  grid-area: 3 / 2 / 4 / 3;
  font-size: x-large;
`;
const TextWrapperCenter = styled("div")`
  border: unset;
  background-color: #f6f6f6;
  color: #030303;
  height: 20px;
  grid-area: 3 / 3 / 4 / 8;
  text-align: center;
`;

const CurrentWrapperDay = styled("div")`
  height: auto;
  width: max-content;
  background: #ff3131;
  border-radius: 50%;
  display: flex;
  margin: 0 auto;
  color: #ffffff;
`;

const Monitor = ({ currentDay, calendar }) => {
  const weekDay = ["", "M", "T", "W", "T", "F", "S", "S"];
  calendar = ["", ...calendar];
  console.log(calendar);

  return (
    <DivWrapper>
      <GridWrapper>
        {weekDay.map((i) => (
          <CellWrapper>
            <TitleWrapper>{i}</TitleWrapper>
          </CellWrapper>
        ))}
        {calendar.map((i) =>
          typeof i === "object" &&
          currentDay.format("DDMMYY") === i.format("DDMMYY") ? (
            <CellWrapper>
              <CurrentWrapperDay>
                <TitleWrapper>{i.format("D")}</TitleWrapper>
              </CurrentWrapperDay>
            </CellWrapper>
          ) : (
            <CellWrapper>
              <TitleWrapper>
                {typeof i === "object" && i.format("D")}
              </TitleWrapper>
            </CellWrapper>
          )
        )}
        <ButtonWrapperLeft>&lt;</ButtonWrapperLeft>
        <TextWrapperCenter>
          <TitleWrapper>{currentDay.format("MMMMYYYY")}</TitleWrapper>
        </TextWrapperCenter>
        <ButtonWrapperRight>&gt;</ButtonWrapperRight>
      </GridWrapper>
    </DivWrapper>
  );
};

export default Monitor;
