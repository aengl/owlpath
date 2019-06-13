#!/usr/bin/env bash

yarn clean

# The now builder doesn't have access to our gallery images on Resilio, so we
# copy them into a tmp dir within the build context
mkdir -p tmp
cp ${GALLERY_PATH:=~/Resilio\ Sync/Owl\ Path}/* tmp/

# Switch to teamturtle scope and deploy
npx now --target staging

# Clean up
rm tmp/*
rmdir tmp
