import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(155, 155, 159, 0.5);
  z-index: 999;
`;
const Input = styled.input`
  padding: 0.5em;
  color: #000;
  background: #ffff;
  border: 1px solid #999;
  border-radius: 3px;
  caret-color: #007aff;
  width: 100%;
  outline: none;
`;
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #e6e6e7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  color: #007aff;
  // border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e6e6e7;
  flex: 1;
  margin-right: 0px;
`;

const Modal = ({ isOpenModal, setIsOpenModal }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const createEvent = () => {
    console.log(inputValue);
  };
  return (
    <div>
      <ModalWrapper isOpen={isOpenModal} onClick={toggleModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>https://calendar.com</h2>
          <p>Enter event time: YYYY-MM-DD HH:mm:ss</p>
          <Input onChange={() => handleInputChange} />
          <ModalButtonWrapper>
            <ModalButton onClick={toggleModal}>Cancel</ModalButton>
            <ModalButton onClick={createEvent}>Ок</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </div>
  );
};

export default Modal;
