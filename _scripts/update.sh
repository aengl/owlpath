#!/usr/bin/env bash -e

yarn
bundle update
./_scripts/writeScheduleData.js
npm install -g https://github.com/aengl/instant-liberation
instalib liberate https://www.instagram.com/camyyssa/ -o _data/instagram.yml -n 12
rm -f assets/instagram/*.jpg
instalib mirror _data/instagram.yml -f detail.display_url -o assets/instagram/
