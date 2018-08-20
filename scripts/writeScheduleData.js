#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const ICAL = require('ical.js');

async function getEvents() {
  const result = await fetch("https://p56-calendars.icloud.com/published/2/b5rWyG3PnwqB68JzYWutInzCp7qkzqZwg2Hjk2OzWeO_2VzVd-OAt5ptv5oInmm96ZJvFQj1QledKu0uwVCN-gsZLwBBhs3a5fo4TqPNDsg");
  const text = await result.text();
  return new ICAL.Component(ICAL.parse(text))
    .getAllSubcomponents()
    .map(e => new ICAL.Event(e));
}

function writeEventData(events) {
  // Filter old events
  const now = new Date();
  events = events.filter(event => event.endDate.toJSDate() > now);

  // Sort events by date
  events.sort((a, b) => a.startDate > b.startDate);

  // Write schedule data
  const data = events.map(event => `- ${event.summary}`).join('\n');
  const dataPath = path.resolve(__dirname, '..', '_data', 'schedule.yml');
  fs.writeFileSync(dataPath, data);
}

getEvents().then(writeEventData);
