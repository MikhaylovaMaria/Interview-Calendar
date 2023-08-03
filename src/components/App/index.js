import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import Footer from "../Footer";
import Modal from "../Modal/modal";
import { getEvents } from "../../service";
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
  const [currentEvents, setCurrentEvents] = useState([]);
  const [buttonDelete, setButtonDelete] = useState(false);

  useEffect(() => {
    const func = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    func();
  }, [setEvents]);

  moment.updateLocale("ru", { week: { dow: 1 } });
  const startDayWeek = today.clone().startOf("week");
  const endDayWeek = today.clone().endOf("week");
  const currentDay = moment();
  const calendar = [];
  const day = startDayWeek.clone();

  useEffect(() => {
    const temp = events.filter(
      (i) => i.time > startDayWeek.unix() && i.time < endDayWeek.unix()
    );
    setCurrentEvents(temp);
  }, [today, events?.length]);

  while (!day.isAfter(endDayWeek)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, "week"));
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, "week"));
  };
  const toToday = () => {
    setToday(currentDay);
  };
  const plusHandler = () => {
    setIsOpenModal(true);
  };
  console.log(today);

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
        events={currentEvents}
        buttonDelete={buttonDelete}
        setButtonDelete={setButtonDelete}
      />
      <Footer toToday={toToday} buttonDelete={buttonDelete} />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </GlobalWrapper>
  );
}

export default App;
