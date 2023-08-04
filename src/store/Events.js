import { createAction, createSlice } from "@reduxjs/toolkit";
import { addEvent, deleteEventById, getEvents } from "../service";

const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    eventsRequested: (state) => {
      state.isLoading = true;
    },
    eventsReceived: (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
    },
    eventsRequestFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    eventCreatedFailed: (state, action) => {
      state.error = action.payload;
    },
    eventRemovedFailed: (state, action) => {
      state.error = action.payload;
    },
    eventRemoveReceived: (state, action) => {
      state.events = state.events.filter((i) => i.id !== action.payload);
    },
  },
});

const { reducer: eventsReducer, actions } = EventsSlice;

const {
  eventsRequested,
  eventsReceived,
  eventsRequestFailed,
  eventCreatedFailed,
  eventRemoveReceived,
  eventRemovedFailed,
} = actions;
const eventCreateReceived = createAction("events/createReceived ");

export const eventsList = () => async (dispatch, getState) => {
  const { startDay, endDay } = getState().currentDay;
  dispatch(eventsRequested());
  try {
    const content = await getEvents(startDay, endDay);
    dispatch(eventsReceived(content));
  } catch (error) {
    dispatch(eventsRequestFailed(error.message));
  }
};

export const createNewEvent = (content) => async (dispatch) => {
  try {
    await addEvent(content);
    dispatch(eventCreateReceived);
    dispatch(eventsList());
  } catch (error) {
    dispatch(eventCreatedFailed(error.message));
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
