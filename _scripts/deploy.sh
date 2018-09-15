#!/usr/bin/env bash -e

./_scripts/update.sh

# Add updated content & posts
git add _data/schedule.yml
git add _data/instagram.yml
git add _posts/*
git add assets/instagram/*

# Commit & push
git commit -m "Update content"
git push
