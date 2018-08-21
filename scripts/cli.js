#!/usr/bin/env node

const debugModule = require('debug');
const fs = require('fs');
const program = require('caporal');
const moment = require('moment');

const debug = debugModule('owlpath:cli');
const packageJson = require('../package.json');

const postTemplate = () => `---
layout: post
title:
date: ${new Date().toISOString()}
---
`;

process.on('unhandledRejection', error => {
  throw error;
});

program.version(packageJson.version);

/* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
 * Command: post
 * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

program
  .command('post', 'Create a new post')
  .argument('<slug>', 'Slug for the post')
  .action(async (args, options) => {
    if (!process.env.DEBUG) {
      debugModule.enable('owlpath:*');
    }
    fs.writeFileSync(`_posts/${moment().format('YYYY-MM-DD')}-${args.slug}.md`, postTemplate());
  });

debug(process.argv);
program.parse(process.argv);
