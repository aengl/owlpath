#!/usr/bin/env bash

# The now builder doesn't have access to our gallery images on Resilio, so we
# copy them into a tmp dir, build and remove it afterwards

yarn clean
mkdir -p tmp
cp ${GALLERY_PATH:=~/Resilio\ Sync/Owl\ Path}/* tmp/
yarn now
rm tmp/*
rmdir tmp
