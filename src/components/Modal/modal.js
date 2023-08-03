import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { addEvent } from "../../service";

const TextWrapper = styled("p")`
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(155, 155, 159, 0.5);
  z-index: 999;
  @media (min-width: 740px) {
    width: 740px;
    left: auto;
  }
`;

const InputWrapper = styled.div`
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5em 10px;
  color: #000;
  background: #ffff;
  border: 1px solid #999;
  border-radius: 3px;
  caret-color: #007aff;
  width: 90%;
  outline: none;
  margin-top: 5%;
  margin-bottom: 2.5%;

  @media (min-width: 740px) {
    width: 476.667px;
  }
`;
const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e6e6e7;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 70%;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border-top: 1px solid red;
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
  const createEvent = async () => {
    if (moment(inputValue).isValid()) {
      try {
        setError(null);
        await addEvent(moment(inputValue).unix());
        setIsOpenModal(false);
      } catch (error) {
        setError(error);
      }
    } else {
      setError("Incorrect data entry");
    }
  };
  return (
    <ModalWrapper isOpen={isOpenModal} onClick={toggleModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TextWrapper>https://calendar.com</TextWrapper>
        <TextWrapper>Enter event time: </TextWrapper>
        <TextWrapper> YYYY-MM-DD HH:mm:ss</TextWrapper>
        <InputWrapper>
          <Input onChange={handleInputChange} />
        </InputWrapper>
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
