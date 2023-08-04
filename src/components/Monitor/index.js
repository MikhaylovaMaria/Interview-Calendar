import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentDay, getweekDay } from "../../store/currentDay";

const TextWrapper = styled("span")`
  font-size: ${(props) =>
    props.$day ? " 0.6rem" : props.$month ? "0.9rem" : "1rem"};
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: ${(props) => (props.$day ? " bold" : "500")};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(3, auto);
  background-color: #f6f6f6;
  position: relative;
  width: 100vw;
  height: 15vh;
  border: 2px solid #ebebeb;
  @media (min-width: 740px) {
    width: 740px;
    // margin-top: 0.396px;
  }
`;

const CellWrapper = styled.div`
  width: 12vw;
  background-color: #f6f6f6;
  color: #030303;
  text-align: center;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 740px) {
    width: 90px;
  }
`;

const ButtonWrapper = styled("button")`
  border: unset;
  background-color: #f6f6f6;
  color: #ff3131;
  grid-area: ${(props) => (props.$left ? "3 / 2 / 4 / 3" : "3 / 8 / 4 / 9")};
  font-size: 1.5rem;
  padding: 0;
`;
const TextWrapperCenter = styled("div")`
  border: unset;
  background-color: #f6f6f6;
  color: #030303;
  grid-area: 3 / 3 / 4 / 8;
  text-align: center;
`;

const CurrentWrapperDay = styled("div")`
  height: 1.5rem;
  width: 1.5rem;
  background: #ff3131;
  border-radius: 50%;
  display: flex;
  padding: 4px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const Monitor = ({ calendar, prevHandler, nextHandler }) => {
  const today = useSelector(getweekDay());
  const currentDay = useSelector(getCurrentDay());
  const weekDay = ["", "M", "T", "W", "T", "F", "S", "S"];
  calendar = ["", ...calendar];

  return (
    <GridWrapper>
      {weekDay.map((i, index) => (
        <CellWrapper key={index}>
          <TitleWrapper $day>{i}</TitleWrapper>
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
        <TitleWrapper $month>{`${today.format("MMMM")} ${today.format(
          "YYYY"
        )}`}</TitleWrapper>
      </TextWrapperCenter>
      <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
    </GridWrapper>
  );
};

export default Monitor;
