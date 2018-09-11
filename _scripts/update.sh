#!/usr/bin/env bash -e

yarn
bundle update
./_scripts/writeScheduleData.js
instalib liberate https://www.instagram.com/camyyssa/ -o _data/instagram.yml
instalib mirror _data/instagram.yml -f display_url -o assets/instagram/
