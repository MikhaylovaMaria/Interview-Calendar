import { createAction, createSlice } from "@reduxjs/toolkit";
import { addEvent, deleteEventById, getEvents } from "../service";

const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    eventsReceived: (state, action) => {
      state.events = action.payload;
    },
    eventRemoveReceived: (state, action) => {
      state.events = state.events.filter((i) => i.id !== action.payload);
    },
  },
});

const { reducer: eventsReducer, actions } = EventsSlice;

const { eventsReceived, eventRemoveReceived } = actions;

const eventCreateReceived = createAction("events/createReceived");
const eventsRequestFailed = createAction("events/LoadFailed");
const eventCreatedFailed = createAction("events/CreatedFailed");
const eventRemovedFailed = createAction("eventsRemovedFailed");

export const eventsList = () => async (dispatch, getState) => {
  const { startDay, endDay } = getState().currentDay;
  try {
    const content = await getEvents(startDay, endDay);
    dispatch(eventsReceived(content));
  } catch (error) {
    dispatch(eventsRequestFailed());
  }
};

export const createNewEvent = (data) => async (dispatch) => {
  try {
    const content = await addEvent(data);
    if (content === null) {
      dispatch(eventCreateReceived());
      dispatch(eventsList());
    }
  } catch (error) {
    dispatch(eventCreatedFailed());
  }
};

export const removeEvent = (id) => async (dispatch) => {
  try {
    const content = await deleteEventById(id);
    if (content === null) {
      dispatch(eventRemoveReceived(id));
    }
  } catch (error) {
    dispatch(eventRemovedFailed());
  }
};

export const getCurrentEvents = () => (state) => state.events.events;

export default eventsReducer;
