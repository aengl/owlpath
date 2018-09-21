#!/usr/bin/env bash -e

# Update dependencies
yarn
bundle update
npm install -g https://github.com/aengl/instant-liberation

# Update schedule
./_scripts/writeScheduleData.js

# Download Instagram data
instalib liberate https://www.instagram.com/camyyssa/ -o _data/instagram.yml -n 12
rm -f assets/instagram/*.jpg

# Mirror Instagram media files
instalib mirror _data/instagram.yml -f detail.display_url -o assets/instagram/
