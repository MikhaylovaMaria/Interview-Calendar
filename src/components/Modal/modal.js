import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { addEvent } from "../../service";

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
  border: 1px solid;
  padding: 0;
  width: 100%;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  color: #007aff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e6e6e7;
  flex: 1;
  margin-right: 0px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Modal = ({ isOpenModal, setIsOpenModal }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setError(null);
  };

  const toggleModal = () => {
    setInputValue("");
    setError(null);
    setIsOpenModal(!isOpenModal);
  };
  const createEvent = () => {
    if (moment(inputValue).isValid()) {
      setError(null);
      addEvent(moment(inputValue).unix());
      setIsOpenModal(false);
    } else {
      setError("Incorrect data entry");
    }
  };
  return (
    <ModalWrapper isOpen={isOpenModal} onClick={toggleModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>https://calendar.com</h2>
        <p>Enter event time: YYYY-MM-DD HH:mm:ss</p>
        <Input onChange={handleInputChange} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ModalButtonWrapper>
          <ModalButton onClick={toggleModal}>Cancel</ModalButton>
          <ModalButton onClick={createEvent}>Ок</ModalButton>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
