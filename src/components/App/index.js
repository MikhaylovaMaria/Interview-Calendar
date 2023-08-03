import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import Footer from "../Footer";
import Modal from "../Modal/modal";
import { deleteEventById, getEvents } from "../../service";
import { styled } from "styled-components";

const GlobalWrapper = styled.div`
  @media (min-width: 740px) {
    margin: auto;
  }
`;

function App() {
  const [today, setToday] = useState(moment());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  // const [currentEvents, setCurrentEvents] = useState([]);
  const [buttonDelete, setButtonDelete] = useState(false);
  const [activeButton, setActiveButton] = useState();

  useEffect(() => {
    const func = async () => {
      const fetchedEvents = await getEvents(startDayWeek, endDayWeek);
      setEvents(fetchedEvents);
    };
    func();

    console.log(events);
  }, [today]);

  const startDayWeek = today.clone().startOf("week").day("Monday");
  const endDayWeek = today.clone().endOf("week").add(1, "day");
  const currentDay = moment();
  const calendar = [];
  const day = startDayWeek.clone();

  // useEffect(() => {
  //   console.log(events);
  //   const temp = events.filter(
  //     (i) => i.time > startDayWeek.unix() && i.time < endDayWeek.unix()
  //   );
  //   setCurrentEvents(temp);
  // }, [today, events?.length]);

  while (!day.isAfter(endDayWeek)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, "week"));
    setButtonDelete(false);
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, "week"));
    setButtonDelete(false);
  };
  const toToday = () => {
    setToday(currentDay);
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

    console.log(temp);
  };
  return (
    <GlobalWrapper>
      <Header plusHandler={plusHandler} />
      <Monitor
        currentDay={currentDay}
        calendar={calendar}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        today={today}
      />
      <CalendarGrid
        startDayWeek={startDayWeek}
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
