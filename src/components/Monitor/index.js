import React from "react";
import styled from "styled-components";

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
  position: relative;
  @media (min-width: 740px) {
    width: 740px;
    margin-top: 0.396px;
    height: 10%;
  }
`;

const CellWrapper = styled.div`
  width: clamp(50px, (100vw + 100vh) / 8, 92.5px);
  background-color: #f6f6f6;
  color: #030303;
  text-align: center;
  @media (min-width: 740px) {
    width: 90px;
  }
`;

const ButtonWrapper = styled("button")`
  border: unset;
  background-color: #f6f6f6;
  color: #ff3131;
  height: 20px;
  grid-area: ${(props) => (props.$left ? "3 / 2 / 4 / 3" : "3 / 8 / 4 / 9")};
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

const Monitor = ({ currentDay, calendar, prevHandler, nextHandler, today }) => {
  const weekDay = ["", "M", "T", "W", "T", "F", "S", "S"];
  calendar = ["", ...calendar];

  return (
    <GridWrapper>
      {weekDay.map((i, index) => (
        <CellWrapper key={index}>
          <TitleWrapper>{i}</TitleWrapper>
        </CellWrapper>
      ))}
      {calendar.map((i, index) =>
        typeof i === "object" &&
        currentDay.format("DDMMYY") === i.format("DDMMYY") ? (
          <CellWrapper key={i.format("DDMMYY")}>
            <CurrentWrapperDay>
              <TitleWrapper>{i.format("D")}</TitleWrapper>
            </CurrentWrapperDay>
          </CellWrapper>
        ) : (
          <CellWrapper key={index}>
            <TitleWrapper>
              {typeof i === "object" && i.format("D")}
            </TitleWrapper>
          </CellWrapper>
        )
      )}
      <ButtonWrapper $left onClick={prevHandler}>
        &lt;
      </ButtonWrapper>
      <TextWrapperCenter>
        <TitleWrapper>{today.format("MMMMYYYY")}</TitleWrapper>
      </TextWrapperCenter>
      <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
    </GridWrapper>
  );
};

export default Monitor;
