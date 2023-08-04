import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const EventsSlice = createSlice({
  name: "events",
  initialState: {},
  reducers: {
    // currentDayPrev: (state) => {
    //   state.weekDay = moment(state.weekDay).clone().subtract(1, "week");
    // },
    // currentDayNext: (state) => {
    //   state.weekDay = moment(state.weekDay).clone().add(1, "week");
    // },
    // currentWeekDay: (state) => {
    //   state.weekDay = state.currentDay;
    // },
  },
});

const { reducer: eventsReducer, actions } = EventsSlice;

// const {  } = actions;

// export const nextHandlerWeek = () => async (dispatch) => {
//   dispatch(currentDayNext());
// };

// export const prevHandlerWeek = () => async (dispatch) => {
//   dispatch(currentDayPrev());
// };
// export const currentHandlerWeek = () => async (dispatch) => {
//   dispatch(currentWeekDay());
// };

// export const getCurrentDay = () => (state) => state.currentDay.currentDay;
// export const getweekDay = () => (state) => state.currentDay.weekDay;

export default eventsReducer;
