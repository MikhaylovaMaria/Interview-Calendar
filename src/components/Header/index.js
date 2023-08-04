import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  width:100vw;
  position: fixed;
  background-color: #ffff;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (min-width: 740px) {
    width: 740px;
    height: 10vh;
}
  }
`;
const TextWrapper = styled("span")`
  font-size: 2rem;
`;
const TitleWrapper = styled(TextWrapper)`
  padding-left: 8%;
`;

const ButtonWrapperPlus = styled("button")`
  border: unset;
  background-color: #ffff;
  color: #ff3131;
  font-size: 3rem;
  margin-right: 4%
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
