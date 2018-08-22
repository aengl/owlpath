#!/usr/bin/env bash

# Update calendar
./scripts/writeScheduleData.js
git add _data/schedule.yml

# Update Instagram feed
./scripts/crawlInstagram.js
git add _data/instagram.yml

# Add all posts
git add _posts/*

# Commit & push
git commit -m "Update content"
git push
