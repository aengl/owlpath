#!/usr/bin/env bash -e

yarn
bundle update
./_scripts/writeScheduleData.js
./_scripts/crawlInstagram.js
