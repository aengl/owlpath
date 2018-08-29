#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');

process.on('unhandledRejection', error => {
  throw error;
});

async function tryEval(element, selector, callback) {
  try {
    return await element.$eval(selector, callback);
  } catch (error) {
    return null;
  }
}

async function getPost(post, page) {
  await page.waitFor('div[role=dialog] article', { timeout: 5000 });
  const url = page.url();
  const dialog = await page.$('div[role=dialog]');
  const date = await page.$eval('time[datetime]', node => node.dateTime);
  const description = await tryEval(dialog, 'li span', node => node.innerText);
  const thumbnailSource = await post.$eval('img[src]', node => node.srcset);
  const thumbnailSourceSet = await post.$eval('img[srcset]', node => node.srcset);
  if (await page.$('video')) {
    return {
      url,
      date,
      description,
      videoSource: await dialog.$eval('video', node => node.src),
      thumbnailSource,
      thumbnailSourceSet
    }
  }
  return {
    url,
    date,
    description,
    imageSource: await dialog.$eval('img[decoding]', node => node.src),
    imageSourceSet: await dialog.$eval('img[decoding]', node => node.srcset),
    thumbnailSource,
    thumbnailSourceSet
  };
}

async function crawl() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: '.chromium/instagram',
  });
  const page = await browser.newPage();

  // Go to user page
  const response = await page.goto('https://www.instagram.com/camyyssa/');
  if (!response.ok()) {
    throw new Error(response.status());
  }

  // Click through posts
  const posts = (await page.$$('a[href^="/p/"]')).slice(0, 12);
  await posts[0].click();
  const data = [];
  for (const post of posts) {
    try {
      data.push(await getPost(post, page));
    } catch (error) {
      console.error(error);
      return;
    }
    const next = await page.$('a.coreSpriteRightPaginationArrow');
    if (!next) {
      break;
    }
    await page.click('a.coreSpriteRightPaginationArrow');
    await page.waitFor(1000);
  }
  await page.close();
  await browser.close();

  return data;
}

function saveData(data) {
  const postPath = path.resolve(__dirname, '..', '_data', 'instagram.yml');
  fs.writeFileSync(postPath, yaml.dump(data));
}

crawl().then(saveData);
