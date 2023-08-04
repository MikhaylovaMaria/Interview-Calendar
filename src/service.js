import { toast } from "react-toastify";

const FIREBASE_DOMAIN =
  "https://interview-calendar-59cc4-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getEvents(start, finish) {
  try {
    const response = await fetch(`${FIREBASE_DOMAIN}/events.json`);
    const data = await response.json();
    const transformedEvents = [];
    for (const key in data) {
      if (data[key] >= start.unix() && data[key] < finish.unix()) {
        const eventObj = {
          id: key,
          time: data[key],
        };
        transformedEvents.push(eventObj);
      }
    }
    return transformedEvents;
  } catch (error) {
    toast.error("Failed to load events. Try later!");
    return Promise.reject(error);
  }
}

export async function addEvent(eventDate) {
  try {
    await fetch(`${FIREBASE_DOMAIN}/events.json`, {
      method: "POST",
      body: JSON.stringify(eventDate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  } catch (error) {
    toast.error("Failed to сreate event. Try later!");
    return Promise.reject(error);
  }
}

export async function deleteEventById(id) {
  try {
    await fetch(`${FIREBASE_DOMAIN}/events/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return null;
  } catch (error) {
    toast.error("Failed to delete event. Try later!");
    return Promise.reject(error);
  }
}
