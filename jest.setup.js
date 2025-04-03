const puppeteer = require('puppeteer');

beforeAll(async () => {
  global.browser = await puppeteer.launch({
    headless: false,  // Modo não headless (para depuração)
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  global.page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});
