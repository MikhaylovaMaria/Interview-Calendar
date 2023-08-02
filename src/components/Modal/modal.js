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
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e6e6e7;
  flex: 1;
  margin-right: 5px;
`;
const DateTimeInput = styled.input.attrs({
  type: "text",
  pattern: "^\\d{4}-\\d{2}-\\d{2}\\s\\d{2}:\\d{2}:\\d{2}$",
})`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Modal = ({ isOpen, setIsOpen }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const createEvent = () => {
    console.log(inputValue);
  };
  return (
    <div>
      <ModalButton onClick={toggleModal}>Открыть модальное окно</ModalButton>
      <ModalWrapper isOpen={isOpen} onClick={toggleModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>https://calendar.com</h2>
          <p>Enter event time: YYYY-MM-DD HH:mm:ss</p>
          <input onChange={()=>handleInputChange} />
          <ModalButtonWrapper>
            <ModalButton onClick={createEvent}>Cancel</ModalButton>
            <ModalButton onClick={toggleModal}>Ок</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </ModalWrapper>
    </div>
  );
};

export default Modal;
