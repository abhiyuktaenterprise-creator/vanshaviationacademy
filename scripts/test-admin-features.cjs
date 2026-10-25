const { chromium } = require('../../indo-air-aviation/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const screenshotsDir = path.join(__dirname, 'screenshots');

  console.log('--- 1. Login to Superadmin ---');
  await page.goto('http://localhost:8080/admin/login', { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', 'admin@vanshaviationacademy.com');
  await page.fill('input[type="password"]', 'VanshAviation@2026!');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin', { timeout: 6000 });
  console.log('PASS: Logged in successfully to /admin');

  // Verify dashboard elements
  await page.waitForSelector('text=Central Registry & Flight Cadets', { timeout: 5000 });
  console.log('PASS: Admin Dashboard header found');

  // Screenshot dashboard
  await page.screenshot({ path: path.join(screenshotsDir, 'admin_indo_same_dashboard.png') });

  // --- 2. Open Certificate Modal ---
  console.log('--- 2. Open Certificate Generator Modal ---');
  await page.click('button:has-text("Create Certificate")');
  await page.waitForSelector('text=Official Flight Certificate Generator', { timeout: 5000 });
  console.log('PASS: Luxury Certificate Modal opened');

  // Wait for canvas render
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, 'admin_certificate_modal.png') });

  // Close certificate modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // --- 3. Click Certificate on a specific Cadet (Rajesh Kumar Verma) ---
  console.log('--- 3. Click Certificate on specific Cadet ---');
  const certBtn = page.locator('tr:has-text("Rajesh Kumar Verma") button:has-text("Certificate")');
  await certBtn.click();
  await page.waitForSelector('text=Official Flight Certificate Generator', { timeout: 5000 });
  await page.waitForSelector('input[value="Rajesh Kumar Verma"]', { timeout: 5000 });
  console.log('PASS: Certificate modal auto-filled with cadet name: Rajesh Kumar Verma');

  await page.screenshot({ path: path.join(screenshotsDir, 'admin_certificate_prefilled.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // --- 4. Add New Cadet ---
  console.log('--- 4. Add New Student Modal ---');
  await page.click('button:has-text("Add Student")');
  await page.waitForSelector('text=Register New Flight Cadet', { timeout: 5000 });

  const testCadetName = 'Kavya Singh Rathore';
  await page.fill('input[placeholder="e.g. Rajesh Kumar Verma"]', testCadetName);
  await page.fill('input[placeholder="e.g. Surendra Kumar Verma"]', 'Digvijay Singh Rathore');
  await page.fill('input[type="date"] >> nth=0', '2002-09-14');

  await page.click('button:has-text("Register Cadet")');
  await page.waitForSelector(`text=${testCadetName}`, { timeout: 6000 });
  console.log(`PASS: Cadet "${testCadetName}" registered and visible in table!`);

  await page.screenshot({ path: path.join(screenshotsDir, 'admin_cadet_registered.png') });

  // --- 5. Verify Newly Registered Cadet on /verify ---
  console.log('--- 5. Verify on Public /verify ---');
  await page.goto('http://localhost:8080/verify', { waitUntil: 'networkidle' });
  await page.fill('#regInput', 'VAA-2026-101');
  await page.click('button[type="submit"]');
  await page.waitForSelector(`text=${testCadetName}`, { timeout: 6000 });
  console.log(`PASS: Newly created cadet "${testCadetName}" verified on public portal!`);

  await browser.close();
  console.log('\n🎉 ALL BACKEND & ADMIN FUNCTIONALITY TESTS PASSED WITH 100% SUCCESS!');
})();
