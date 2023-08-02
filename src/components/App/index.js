import React from "react";
import moment from "moment";
import Header from "../Header";
import Monitor from "../Monitor";
import CalendarGrid from "../CalendarGrid";
import Footer from "../Footer";

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const startDayWeek = moment().startOf("week");
  const endDayWeek = moment().endOf("week");
  const currentDay = moment();
  const calendar = [];
  const day = startDayWeek.clone();

  while (!day.isAfter(endDayWeek)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }
  console.log(calendar);

  return (
    <div>
      <Header />
      <Monitor currentDay={currentDay} calendar={calendar} />
      <CalendarGrid startDayWeek={startDayWeek} />
      <Footer />
    </div>
  );
}

export default App;
