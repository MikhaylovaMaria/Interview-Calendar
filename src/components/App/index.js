import React, { useEffect, useState } from "react";
import Header from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import Footer from "../Footer";
import Modal from "../Modal/modal";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  currentHandlerWeek,
  getEndDayWeek,
  getStartDayWeek,
  nextHandlerWeek,
  prevHandlerWeek,
} from "../../store/currentDay";
import { eventsList, getCurrentEvents, removeEvent } from "../../store/events";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalWrapper = styled.div`
  @media (min-width: 740px) {
    margin: auto;
  }
`;

function App() {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const events = useSelector(getCurrentEvents());
  const [buttonDelete, setButtonDelete] = useState(false);
  const [activeButton, setActiveButton] = useState();

  useEffect(() => {
    dispatch(eventsList());
  }, []);

  const startDayWeek = useSelector(getStartDayWeek());
  const endDayWeek = useSelector(getEndDayWeek());

  const calendar = [];
  const day = startDayWeek.clone();

  while (!day.isAfter(endDayWeek)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }

  const prevHandler = () => {
    dispatch(prevHandlerWeek());
    dispatch(eventsList());
    setButtonDelete(false);
    setActiveButton(null);
  };
  const nextHandler = () => {
    dispatch(nextHandlerWeek());
    dispatch(eventsList());
    setButtonDelete(false);
    setActiveButton(null);
  };
  const toToday = () => {
    dispatch(currentHandlerWeek());
    dispatch(eventsList());
    setButtonDelete(false);
    setActiveButton(false);
    setActiveButton(null);
  };
  const plusHandler = () => {
    setIsOpenModal(true);
    setButtonDelete(false);
    setActiveButton(null);
  };

  function currentButtonClick(id) {
    setButtonDelete(true);
    setActiveButton(id);
  }

  const deleteEvent = () => {
    const temp = events.filter(
      (i) => i.time >= activeButton && i.time < activeButton + 3600
    );
    temp.map((i) => dispatch(removeEvent(i.id)));
    setButtonDelete(false);
    setActiveButton(false);
  };
  return (
    <GlobalWrapper>
      <Header plusHandler={plusHandler} />
      <Monitor
        calendar={calendar}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
      />
      <CalendarGrid
        buttonDelete={buttonDelete}
        setButtonDelete={setButtonDelete}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        currentButtonClick={currentButtonClick}
      />
      <Footer
        toToday={toToday}
        buttonDelete={buttonDelete}
        deleteEvent={deleteEvent}
      />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <ToastContainer />
    </GlobalWrapper>
  );
}

export default App;
