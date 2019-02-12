#!/usr/bin/env node

const schedule = require('../schedule');

schedule
  .getEvents()
  .then(events =>
    schedule.writeEventData(
      schedule.sortEventsByDate(schedule.filterOldEvents(events))
    )
  );
