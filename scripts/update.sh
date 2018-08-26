#!/usr/bin/env bash -e

yarn
bundle update
./scripts/writeScheduleData.js
./scripts/crawlInstagram.js
