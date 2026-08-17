#!/usr/bin/env node

/**
 * @file   why-did-you-update.js
 * @date   2020-01-06
 *
 */

const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X'];
const devices = [
  {
    name: 'Desktop 1920x1080',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    viewport: {
      width: 1920,
      height: 1080,
    },
  },
  iPhone,
];
(async () => {
  const messages = {
    [devices[0].name]: { texts: [], repaints: 0 },
    [devices[1].name]: { texts: [], repaints: 0 },
  };
  for (const device of devices) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (device.name === 'iPhone X') {
      await page.setExtraHTTPHeaders({
        'x-device': 'mobile',
      });
    }
    await page.emulate(device);
    page.on('console', (message) => {
      const t = message.type();
      if (t === 'endGroup') {
        messages[device.name].repaints += 1;
      }
      messages[device.name].texts.push(message.text());
    });
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 0,
    });
    await browser.close();
  }
  console.log(devices[0].name);
  console.log('Log messages', messages[devices[0].name].texts.length);
  console.log('Repaints', messages[devices[0].name].repaints);
  console.log(devices[1].name);
  console.log('Log messages', messages[devices[1].name].texts.length);
  console.log('Repaints', messages[devices[1].name].repaints);
})();
