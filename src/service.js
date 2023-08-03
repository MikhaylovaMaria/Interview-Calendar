const FIREBASE_DOMAIN =
  "https://interview-calendar-59cc4-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getEvents(start, finish) {
  const response = await fetch(`${FIREBASE_DOMAIN}/events.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Eveeeeennnnntt");
  }

  const transformedEvents = [];

  for (const key in data) {
    // console.log(start.unix());
    // console.log(data[key]);
    if (data[key] >= start.unix() && data[key] < finish.unix()) {
      const eventObj = {
        id: key,
        time: data[key],
      };

      transformedEvents.push(eventObj);
    }
  }

  return transformedEvents;
}

export async function addEvent(eventDate) {
  const response = await fetch(`${FIREBASE_DOMAIN}/events.json`, {
    method: "POST",
    body: JSON.stringify(eventDate),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create event.");
  }

  return null;
}

export async function deleteEvent(id) {
  const response = await fetch(`${FIREBASE_DOMAIN}/events.json`, {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete event.");
  }

  return null;
}
