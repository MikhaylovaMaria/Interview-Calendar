import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  width:auto;
  position: fixed;
  background-color: #ffff;
  font-size: 25px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 15vh;
  @media (min-width: 740px) {
    width: 740px;
    height: 10vh;
}
  }
`;
const TextWrapper = styled("span")`
  font-size: 20px;
`;
const TitleWrapper = styled(TextWrapper)`
  padding-left: 12.5%;
`;

const ButtonWrapperPlus = styled("button")`
  border: unset;
  background-color: #ffff;
  color: #ff3131;
  font-size: 40px;
  margin-left: 0;
`;

const Header = ({ plusHandler }) => {
  return (
    <DivWrapper>
      <TitleWrapper>Interview Calendar</TitleWrapper>
      <ButtonWrapperPlus onClick={plusHandler}>+</ButtonWrapperPlus>
    </DivWrapper>
  );
};

export default Header;
