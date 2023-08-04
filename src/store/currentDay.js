import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const currentDaySlice = createSlice({
  name: "currentDay",
  initialState: {
    currentDay: moment(),
    weekDay: moment(),
    startDay: moment().startOf("week").day("Monday"),
    endDay: moment().endOf("week").add(1, "day"),
  },
  reducers: {
    currentDayPrev: (state) => {
      state.weekDay = moment(state.weekDay).clone().subtract(1, "week");
      state.startDay = moment(state.weekDay)
        .clone()
        .startOf("week")
        .day("Monday");
      state.endDay = moment(state.weekDay).clone().endOf("week").add(1, "day");
    },
    currentDayNext: (state) => {
      state.weekDay = moment(state.weekDay).clone().add(1, "week");
      state.startDay = moment(state.weekDay)
        .clone()
        .startOf("week")
        .day("Monday");
      state.endDay = moment(state.weekDay).clone().endOf("week").add(1, "day");
    },
    currentWeekDay: (state) => {
      state.weekDay = state.currentDay;
      state.startDay = moment(state.weekDay)
        .clone()
        .startOf("week")
        .day("Monday");
      state.endDay = moment(state.weekDay).clone().endOf("week").add(1, "day");
    },
  },
});

const { reducer: currentDayReducer, actions } = currentDaySlice;

const { currentDayPrev, currentDayNext, currentWeekDay } = actions;

export const nextHandlerWeek = () => async (dispatch) => {
  dispatch(currentDayNext());
};

export const prevHandlerWeek = () => async (dispatch) => {
  dispatch(currentDayPrev());
};
export const currentHandlerWeek = () => async (dispatch) => {
  dispatch(currentWeekDay());
};

export const getCurrentDay = () => (state) => state.currentDay.currentDay;
export const getweekDay = () => (state) => state.currentDay.weekDay;
export const getStartDayWeek = () => (state) => state.currentDay.startDay;
export const getEndDayWeek = () => (state) => state.currentDay.endDay;

export default currentDayReducer;
