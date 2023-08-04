import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../store/events";

const TextWrapper = styled("p")`
  text-align: center;
  margin: 0;
  font-size: ${(props) => (props.$text || props.$left ? " 2rem" : "1.2rem")};
  font-weight: ${(props) => (props.$text ? "bold" : "none")};
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
  border-top: 1px solid #69697d;
  width: 100%;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  color: #007aff;
  cursor: pointer;
  background-color: #e6e6e7;
  border: none;
  border-right: ${(props) => (props.$right ? "1px solid #69697d" : "none")};
  flex: 1;
  border-bottom-right-radius: ${(props) => (props.$left ? "10px" : "0")};
  border-bottom-left-radius: ${(props) => (props.$right ? "10px" : "0")};
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

const Modal = ({ isOpenModal, setIsOpenModal }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setError(null);
  };

  const toggleModal = () => {
    setError(null);
    setIsOpenModal(false);
    setInputValue(null);
  };
  const createEvent = () => {
    if (moment(inputValue).isValid()) {
      dispatch(createNewEvent(moment(inputValue).unix()));
      setError(null);
      setInputValue(null);
      setIsOpenModal(false);
    } else {
      setError("Incorrect data entry");
    }
  };
  return (
    <ModalWrapper isOpen={isOpenModal} onClick={toggleModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TextWrapper $text>https://calendar.com</TextWrapper>
        <TextWrapper>Enter event time: </TextWrapper>
        <TextWrapper> YYYY-MM-DD HH:mm:ss</TextWrapper>
        <InputWrapper>
          <Input onChange={handleInputChange} />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ModalButtonWrapper>
          <ModalButton $right onClick={toggleModal}>
            Cancel
          </ModalButton>
          <ModalButton $left onClick={createEvent}>
            Ок
          </ModalButton>
        </ModalButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
