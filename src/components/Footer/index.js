import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  height: 10vh;
  background-color: #f6f6f6;
  position: relative;
  left: 0px;
  bottom: 0px;
  width: 100%;
`;

const TodayButton = styled("button")`
  border: unset;
  background: none;
`;
const TextWrapper = styled("span")`
  padding-left: 10%;
  font-size: 25px;
  color: #ff3131;
`;

const Footer = ({ toToday, buttonDelete }) => {
  return (
    <DivWrapper>
      <TodayButton onClick={toToday}>
        <TextWrapper>Today</TextWrapper>
        {buttonDelete && <TextWrapper>Delete</TextWrapper>}
      </TodayButton>
    </DivWrapper>
  );
};

export default Footer;
