const { chromium } = require('../../indo-air-aviation/node_modules/playwright');
const path = require('path');
const fs = require('fs');

async function runTests() {
  console.log('🚀 Starting Playwright End-to-End Test Suite for Vansh Aviation Academy...');
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome'
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  try {
    // TEST 1: Public Homepage
    console.log('\n--- TEST 1: Public Homepage ---');
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
    const pageTitle = await page.title();
    console.log('✅ Homepage Loaded. Title:', pageTitle);
    await page.screenshot({ path: path.join(screenshotsDir, '01_homepage.png'), fullPage: false });

    // TEST 2: Public Verification Page Search
    console.log('\n--- TEST 2: Public Verification Page ---');
    await page.goto('http://localhost:8080/verify', { waitUntil: 'networkidle' });
    console.log('✅ Navigated to /verify');

    // Fill registration number
    await page.fill('#regInput', 'VAA-2025-CPL-01');
    console.log('Entered registration number: VAA-2025-CPL-01');

    // Click submit button
    await page.click('button[type="submit"]');
    
    // Wait for verified credential card
    await page.waitForSelector('text=Rajesh Kumar Verma', { timeout: 6000 });
    console.log('✅ Verified Credential Card rendered for cadet: Rajesh Kumar Verma');
    
    await page.waitForSelector('text=Official Credential Verified', { timeout: 4000 });
    console.log('✅ Official Credential Verified banner found');

    await page.screenshot({ path: path.join(screenshotsDir, '02_verified_credential.png'), fullPage: false });

    // TEST 3: Superadmin Login
    console.log('\n--- TEST 3: Superadmin Login ---');
    await page.goto('http://localhost:8080/admin/login', { waitUntil: 'networkidle' });
    console.log('✅ Navigated to /admin/login');

    // Enter admin credentials
    await page.fill('input[type="email"]', 'admin@vanshaviationacademy.com');
    await page.fill('input[type="password"]', 'VanshAviation@2026!');
    console.log('Entered administrator credentials');

    await page.click('button[type="submit"]');

    // Wait for redirect to /admin
    await page.waitForURL('**/admin', { timeout: 6000 });
    console.log('✅ Successfully authenticated and redirected to /admin');

    await page.waitForSelector('text=Central Registry & Student Verification Database', { timeout: 6000 });
    console.log('✅ Superadmin Dashboard loaded successfully');

    await page.screenshot({ path: path.join(screenshotsDir, '03_admin_dashboard.png'), fullPage: false });

    // TEST 4: Create a New Cadet in Superadmin
    console.log('\n--- TEST 4: Add New Cadet in Superadmin ---');
    const newRegNo = 'VAA-2026-TEST-' + Math.floor(1000 + Math.random() * 9000);
    const newCadetName = 'Aryan Vikram Dixit';

    // Click "Add New Student"
    await page.click('text=Add New Student');
    await page.waitForSelector('text=Register New Flight Cadet', { timeout: 4000 });
    console.log('✅ Add Cadet Modal opened');

    // Fill new student details
    await page.fill('input[placeholder="e.g. Vikramaditya Singh"]', newCadetName);
    await page.fill('input[placeholder="e.g. Surendra Singh"]', 'Sanjay Dixit');
    await page.fill('input[placeholder="e.g. VAA-2026-CPL-101"]', newRegNo);

    // Submit modal
    await page.click('button:has-text("Register Cadet")');
    console.log(`Submitted new cadet: ${newCadetName} (${newRegNo})`);

    // Verify cadet appears in dashboard table
    await page.waitForSelector(`text=${newCadetName}`, { timeout: 6000 });
    console.log('✅ New cadet record confirmed in Superadmin table');

    await page.screenshot({ path: path.join(screenshotsDir, '04_cadet_added.png'), fullPage: false });

    // TEST 5: Verify the Newly Added Cadet in Public Portal
    console.log('\n--- TEST 5: Verify Newly Added Cadet on /verify ---');
    await page.goto(`http://localhost:8080/verify?q=${newRegNo}`, { waitUntil: 'networkidle' });
    
    await page.waitForSelector(`text=${newCadetName}`, { timeout: 6000 });
    console.log(`✅ Newly registered cadet "${newCadetName}" successfully verified on public /verify portal!`);

    await page.screenshot({ path: path.join(screenshotsDir, '05_newly_verified_cadet.png'), fullPage: false });

    console.log('\n🎉 ALL 5 PLAYWRIGHT TESTS PASSED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    await page.screenshot({ path: path.join(screenshotsDir, 'error_state.png'), fullPage: false });
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runTests();
