#!/usr/bin/env bash

# The now builder doesn't have access to our gallery images, so we copy them
# into a tmp dir within the build context
mkdir -p tmp
cp ${GALLERY_PATH:=~/Library/Mobile\ Documents/com~apple~CloudDocs/Owl\ Path}/* tmp/

# Deploy to production
npx now --prod

# Clean up
rm tmp/*
rmdir tmp
