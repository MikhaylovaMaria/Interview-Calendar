const FIREBASE_DOMAIN =
  "https://interview-calendar-59cc4-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getEvents() {
  const response = await fetch(`${FIREBASE_DOMAIN}/events.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Eveeeeennnnntt");
  }

  const transformedEvents = [];

  for (const key in data) {
    const eventObj = {
      id: key,
      time: data[key],
    };

    transformedEvents.push(eventObj);
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
