#!/usr/bin/env bash -e

# Update dependencies
yarn
bundle update

# Update schedule
./_scripts/writeScheduleData.js

# Download Instagram data
npx instalib liberate https://www.instagram.com/camyyssa/ -o _data/instagram.yml -n 12
rm -f assets/instagram/*.jpg

# Mirror Instagram media files
npx instalib mirror _data/instagram.yml -f detail.display_url -o assets/instagram/
