import React, { useEffect, useState } from "react";
import Header from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import Footer from "../Footer";
import Modal from "../Modal/modal";
import { deleteEventById, getEvents } from "../../service";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  currentHandlerWeek,
  getEndDayWeek,
  getStartDayWeek,
  getweekDay,
  nextHandlerWeek,
  prevHandlerWeek,
} from "../../store/currentDay";

const GlobalWrapper = styled.div`
  @media (min-width: 740px) {
    margin: auto;
  }
`;

function App() {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [buttonDelete, setButtonDelete] = useState(false);
  const [activeButton, setActiveButton] = useState();

  // const currentDay = useSelector(getCurrentDay());
  // const currentDay = moment();
  const today = useSelector(getweekDay());
  // const [today, setToday] = useState(moment());

  useEffect(() => {
    const func = async () => {
      const fetchedEvents = await getEvents(startDayWeek, endDayWeek);
      setEvents(fetchedEvents);
    };
    func();
  }, [today]);

  // const temp = useSelector(getStartDayWeek());
  // console.log(temp);

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
    // setToday((prev) => prev.clone().subtract(1, "week"));
    setButtonDelete(false);
  };
  const nextHandler = () => {
    dispatch(nextHandlerWeek());
    // setToday((prev) => prev.clone().add(1, "week"));
    setButtonDelete(false);
  };
  const toToday = () => {
    dispatch(currentHandlerWeek());
    // setToday(currentDay);
    setButtonDelete(false);
    setActiveButton(false);
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
    temp.map((i) => deleteEventById(i.id));
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
        events={events}
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
    </GlobalWrapper>
  );
}

export default App;
