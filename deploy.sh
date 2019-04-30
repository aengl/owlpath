#!/usr/bin/env bash

# The now builder doesn't have access to our gallery images on Resilio, so we
# copy them into a tmp dir, build and remove it afterwards

mkdir -p tmp
cp ~/Resilio\ Sync/Owl\ Path/* tmp/
yarn now
rm tmp/*
rmdir tmp
