import { test, expect } from '@playwright/test';
import textData from '../testData/textData.json';

class RecordsPage {

    constructor(page) {
        this.page = page;

        // Navigation / Header
        this.recordsButton = page.getByRole('link', { name: 'Records' });
        this.primaryRecordsButton = page.getByText('Primary');
        this.checkAll = page.getByRole('checkbox', { name: 'Select All' });

        // Mass Action
        this.massActionButton = page.locator('//button[@id="toggle_mass_action"]');
        this.editButton = page.locator('#ma-action-radio-edit');
        this.nextButton = page.locator('//button[@id="maButton-Next"]');
        this.dropdown = page.locator('span[role="combobox"][aria-label="Field"]');
        this.fieldname = page.getByRole('option', { name: 'LT FIELD1' });
        this.textArea = page.getByRole('textbox', { name: 'Replace Text' });

        // Mass Action Re-declared (duplicate IDs handled)
        this.massActionButton = page.getByRole('button', { name: ' ' });
        this.editRadio = page.getByRole('radio', { name: 'Edit' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.goButton = page.locator('#maButton-Go');

        this.yesButton = page.getByRole('button', { name: 'Yes' });
        this.fieldDropdown = page.getByRole('combobox', { name: 'Field', exact: true }).locator('span').nth(1);
        this.replaceTextBox = page.getByRole('textbox', { name: 'Replace Text' });

        // History
        this.massActionHistoryButton = page.locator('//button[@id="toggle_mass_action_history"]');
        this.firstRow = page.locator("tbody tr").first();
        this.tableRows = page.locator('tbody[role="rowgroup"] tr');

        // Modals
        this.closeModalButton = this.page.getByRole('button', { name: 'Close' }).first();

        // Highlight validation
        this.rowSelector = (fieldName) => `//div[contains(@class,'table-row') and .//span[text()='${fieldName}']]`;
        this.highlightedSpan = '.Wordmark';

        // Notification
        this.notificationButton = page.locator('#indexNotification');


       this.searchBar = page.locator("//input[@id='search_builder_input_widget_datastore_0']");

       this.goToDocumentButton = page.getByRole('button', { name: 'Go to Document View' });

      this.recordsButton = page.locator("//span[@class='k-button-text'][normalize-space()='Records']");

     this.clearSearch = page.locator("//button[@title='Clear Search']");  
    }

    // ----------------------------- Navigation / Clicks -----------------------------
    async clickRecordsButton() {

  await this.recordsButton.waitFor({ state: 'attached', timeout: 60000});
  await this.recordsButton.click();
    }

    async clickCheckAllButton() {
        await this.checkAll.waitFor({ state: 'visible', timeout: 50000 });
        await this.checkAll.click();
    }

    async validateSelectAllCounter() {
        const totalItems = parseInt(
            (await this.page.locator('div.k-pager-info-with-refresh span').innerText())
                .split('of')[1].trim().split(' ')[0], 10
        );

        const selectedItems = parseInt(
            await this.page.locator('div.float-selection-counter div').innerText(), 10
        );

        expect.soft(selectedItems).toBe(totalItems);
    }

    // ----------------------------- Mass Edit -----------------------------
    async performMassEdit(fieldName) {
       
        await this.massActionButton.click();

        
        await this.editRadio.waitFor({ state: 'visible', timeout: 10000 });
        await this.editRadio.check();
        await this.nextButton.click();

      
        await this.fieldDropdown.click();
        this.page.getByRole('option', { name: fieldName }).locator('span').click();

       
        await this.replaceTextBox.click();
        await this.replaceTextBox.fill(textData.text);
        await this.goButton.click();
        await this.yesButton.click({ modifiers: ['Shift'] });
    }

    // ----------------------------- Index sync -----------------------------
  async verifyIndexNotificationDisappears(timeout = 60000) {
    
    await expect(this.notificationButton).toBeHidden({ timeout });
    console.log('Assertion passed: indexNotification button disappeared.');

}



     async searchInField(word, fieldName) {
          const Query = `${word} within '${fieldName}'`;
        await this.searchBar.fill(Query);
        await this.page.keyboard.press('Enter');
       await this.page.keyboard.press('Enter');
     
 await this.page.waitForTimeout(3000);
    }




    // Function to return total page count

    async totalRowCount(){
const totalItemsText = await this.page
  .locator('div.k-pager-info-with-refresh span', { hasText: /of \d+ items/ })
  .innerText();
const totalItems = parseInt(
    totalItemsText.split('of')[1].trim().split(' ')[0], 
    10
);
return totalItems;
    }

// Nav to documents

    async goToDocument(){
 this.goToDocumentButton.click();
    }

    



    // ----------------------------- Highlight Validation -----------------------------

    async getHighlightedWords(fieldName) {
        const row = this.page.locator(this.rowSelector(fieldName));
        await row.waitFor(); // wait for the row to load
        return row.locator(this.highlightedSpan).allTextContents();
    }

    async validateOnlyHighlight(fieldName, expectedWord) {
        const highlights = await this.getHighlightedWords(fieldName);
    expect.soft(highlights.join(" ")).toBe(expectedWord);

        // click records button to nav back 
       await this.recordsButton.click();
       await this.clearSearch.click();

    }
}





module.exports = RecordsPage;
