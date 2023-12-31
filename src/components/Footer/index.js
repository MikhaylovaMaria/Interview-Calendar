import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  height: 5vh;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  @media (min-width: 740px) {
    left: auto;
    width: 740px;
  }
`;

const TodayButton = styled("button")`
  border: unset;
  background: none;
`;
const TextWrapper = styled("span")`
  font-size: 2.5vh;
  color: #ff3131;
  padding-left: ${(props) => (props.right ? "0" : "18px")};
  padding-right: ${(props) => (props.right ? "0" : "18px")};
  @media (min-width: 740px) {
    font-size: 4vh;
  }
`;
const DeleteButton = styled("button")`
  border: unset;
  background: none;
`;
const Footer = ({ toToday, buttonDelete, deleteEvent }) => {
  return (
    <DivWrapper>
      <TodayButton onClick={toToday}>
        <TextWrapper>Today</TextWrapper>
      </TodayButton>

      {buttonDelete && (
        <DeleteButton onClick={deleteEvent}>
          <TextWrapper $right>Delete</TextWrapper>
        </DeleteButton>
      )}
    </DivWrapper>
  );
};

export default Footer;
