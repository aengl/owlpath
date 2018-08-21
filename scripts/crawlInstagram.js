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

async function getPost(page) {
  await page.waitFor('div[role=dialog] article', { timeout: 2000 });

  // Extract image source
  const imageSourceSet = await tryEval(
    page,
    'div[role=dialog] img[decoding]',
    node => node.srcset
  );

  // Extract description
  const description = await tryEval(
    page,
    'div[role=dialog] li span',
    node => node.innerText
  );

  // Extract date
  const date = await page.$eval('time[datetime]', node => node.dateTime);

  return {
    date,
    imageSourceSet,
    description,
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
  const posts = await page.$$('a[href^="/p/"]');
  await posts[0].click();
  const data = [];
  for (const post of posts) {
    data.push({
      ...(await getPost(page)),
      thumbnail: await post.$eval('img[srcset]', node => node.srcset),
    });
    try {
      await page.click('a.coreSpriteRightPaginationArrow');
      await page.waitFor(1000);
    } catch (error) {
      break;
    }
  }

  await page.close();
  await browser.close();

  return data;
}

function saveData(data) {
  const postPath = path.resolve(__dirname, '..', '_data', 'instagram.yml');
  fs.writeFileSync(postPath, yaml.dump(data.filter(d => !!d.imageSourceSet)));
}

crawl().then(saveData);
