async function getEvents() {
  const result = await fetch("/static/calendar");
  const text = await result.text();
  return new ICAL.Component(ICAL.parse(text))
    .getAllSubcomponents()
    .map(e => new ICAL.Event(e));
}

function renderEvents(events) {
  // Filter old events
  const now = new Date();
  console.log(events);
  events = events.filter(event => event.endDate.toJSDate() > now);
  console.warn(events);

  // Sort events by date
  events.sort((a, b) => a.startDate > b.startDate);

  // Create list of events
  const schedule = document.getElementById("schedule");
  schedule.innerHTML = "";
  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(event.summary));
    schedule.appendChild(listItem);
  });
}

getEvents().then(renderEvents);
