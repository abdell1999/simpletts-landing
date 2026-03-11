const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/index.html`);

  const results = await new AxePuppeteer(page).analyze();
  console.log('Axe Violations:');

  if (results.violations.length === 0) {
      console.log('No violations found!');
  } else {
      results.violations.forEach(v => {
          console.log(`- ${v.id}: ${v.description}`);
          console.log(`  Help: ${v.helpUrl}`);
          console.log(`  Impact: ${v.impact}`);
          console.log(`  Nodes:`);
          v.nodes.forEach(n => console.log(`    ${n.html}`));
          console.log('');
      });
  }

  await browser.close();
})();
