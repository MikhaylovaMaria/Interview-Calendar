import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentDayReducer from "./currentDay";
import eventsReducer from "./events";


const rootReducer = combineReducers({
  currentDay: currentDayReducer,
  events: eventsReducer
});

export function createStore() {
  return configureStore({ reducer: rootReducer });
}
