import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProjectsPage from '../pages/projectsPage';
import FieldPage from '../pages/FieldPage';
import RecordsPage from '../pages/recordsPage';
import creds from '../testData/creds.json';

test.describe.serial('AUTH: create storage state', () => {
    // Clear storage state for login test
    test.use({ storageState: undefined });

    test('Login and save storage state', async ({ page }) => {

        // ----------------------------- Initialize Pages -----------------------------
        const loginPage = new LoginPage(page);
        const projectPage = new ProjectsPage(page);
        const fieldPage = new FieldPage(page);
        const recordsPage = new RecordsPage(page);

       const fieldData = `Field_test_${Math.floor(Math.random() * 10000)}`;


        // ----------------------------- Step 1: Login -----------------------------
        await loginPage.goto();
        await loginPage.login(creds.validUser.username, creds.validUser.password);

        // Save storage state for subsequent tests
        await page.context().storageState({ path: 'fixtures/storageState.json' });

        // Assert user is logged in
        await expect(projectPage.usernameProfile).toHaveText(/AutoUser1/i);

        // ----------------------------- Step 2: Select Project -----------------------------
        await projectPage.clickProjectName();
        await projectPage.validatePageTitle('QA ACL Resesarch1');

        // ----------------------------- Step 3: Create New Field -----------------------------
        await fieldPage.clickFieldButton();
        await fieldPage.clickNewFieldButton();
        await fieldPage.createField(fieldData, "4000");

        // Verify field appears in the table
        await fieldPage.verifyFieldCreated(fieldData);

        // ----------------------------- Step 4: Additional Validations -----------------------------
        // Placeholder for checkbox validations or any other steps
        // Example: await recordsPage.clickCheckAllButton();

 // Or click Records button in the sidebar
//   await recordsPage.clickRecordsButton();

await page.goto('/');
 await projectPage.clickProjectName();
 await page.waitForTimeout(30000);
 await page.reload();




    await recordsPage.clickCheckAllButton();

    // assert all records selected
    await recordsPage.validateSelectAllCounter();


    // perform mass action
  await  recordsPage.performMassEdit(fieldData);

// validate from index sync button that all records are udpated 


   await recordsPage.verifyIndexNotificationDisappears();

 
await page.waitForTimeout(30000);

   // --------------------------Search and validate the results. 

// click search feild 

// Define test data (word + field + expected highlights)
const testData = [
  { word: "hillary", field: fieldData, expected: "Hillary" },
 { word: "9849876", field: fieldData, expected: "9849876" },
 { word: "senate intel", field: fieldData, expected: "senate intel" }
];

for (const data of testData) {
  // Step 1: Search

 
  await recordsPage.searchInField(data.word, data.field);

  // Step 2: Assert total records count
  const rowsCount = await recordsPage.totalRowCount();
  expect.soft(rowsCount).toBe(179);
  console.log(`Rows count for ${data.word}:`, rowsCount);

  // Step 3: Verify highlights in document
  await recordsPage.goToDocument();
  await recordsPage.validateOnlyHighlight(data.field, data.expected);
}


    });
});
