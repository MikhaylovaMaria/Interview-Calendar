import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  height: 40px;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 10vh;
`;
const TextWrapper = styled("span")`
  font-size: 25px;
  color: #ff3131;

`;

const Footer = () => {
  return (
    <DivWrapper>
      <TextWrapper>Today</TextWrapper>
    </DivWrapper>
  );
};

export default Footer;
