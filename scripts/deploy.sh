#!/usr/bin/env bash

# Update calendar
./scripts/writeScheduleData.js
git add _data/schedule.yml

# Add all posts
git add _posts/*

# Commit & push
git commit -m "Deploy"
git push
