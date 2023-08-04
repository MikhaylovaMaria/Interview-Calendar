import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentDay, getweekDay } from "../../store/currentDay";

const TextWrapper = styled("span")`
  font-size: ${(props) =>
    props.$day ? "1vh" : props.$month ? "1.5vh" : "1.8vh"};
  @media (min-width: 740px) {
    font-size: ${(props) =>
      props.$day ? "2vh" : props.$month ? "2.5vh" : "2.8vh"};
  }
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
  height: 10vh;
  border: 2px solid #ebebeb;
  @media (min-width: 740px) {
    height: 15vh;
    width: 740px;
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
  font-size: 2.5vh;
  padding: 0;
  @media (min-width: 740px) {
    font-size: 4vh;
  }
`;
const TextWrapperCenter = styled("div")`
  border: unset;
  background-color: #f6f6f6;
  color: #030303;
  grid-area: 3 / 3 / 4 / 8;
  text-align: center;
`;

const CurrentWrapperDay = styled("div")`
  height: 2.2vh;
  width: 2.2vh;
  background: #ff3131;
  border-radius: 50%;
  display: flex;
  padding: 4px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  @media (min-width: 740px) {
    height: 3.2vh;
    width: 3.2vh;
  }
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
