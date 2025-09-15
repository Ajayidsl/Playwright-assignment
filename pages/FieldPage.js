import { test, expect } from '@playwright/test';

class FieldPage {
    constructor(page) {
        this.page = page;

        this.fieldButton = page.getByRole('link', { name: 'Fields' });
        this.newFieldButton = page.getByRole('button', { name: 'New Field' });
        this.nameInput = page.getByPlaceholder('Name');
        this.lengthField = page.locator('label[data-label="Length"] input[type="tel"]');
        this.createFieldBtn = page.getByRole('button', { name: 'Create Field' });
        this.tableRows = page.locator('table.k-grid-table tbody tr');
    }

   
    async clickFieldButton() {
       
        await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });

        
        await this.fieldButton.waitFor({ state: 'visible', timeout: 30000 });

        
        await expect(this.fieldButton).toBeEnabled({ timeout: 10000 });

       
        await this.fieldButton.click();
    }

    async clickNewFieldButton() {
        await this.newFieldButton.click();
    }

    async fillNameField(newFieldName) {
        await this.nameInput.fill(newFieldName);
    }

    async fillLength(lengthOfText) {
        await this.lengthField.fill(lengthOfText);
    }

    async clickCreateField() {
        await this.createFieldBtn.click();
    }

    async createField(input, length) {
        await this.fillNameField(input);
        await this.fillLength(length);
        await this.clickCreateField();
    }

 
    async verifyFieldCreated(fieldName) {
        const maxRetries = 5;
        const delay = 5000;   
        let found = false;

        for (let i = 0; i < maxRetries; i++) {
            const rowTexts = await this.tableRows.allInnerTexts();
            console.log(`Attempt ${i + 1}:`, rowTexts);

            if (rowTexts.some(text => text.includes(fieldName))) {
                console.log(`Field "${fieldName}" found in the table.`);
                found = true;
                break; 
            }

            console.log(`Field "${fieldName}" not found yet, retrying...`);
            await this.page.waitForTimeout(delay);
        }

       
        expect.soft(found, `Field "${fieldName}" should be present in the table`).toBe(true);

        if (!found) {
            console.warn(`Field "${fieldName}" was not found after ${maxRetries} retries.`);
        }
    }
}

module.exports = FieldPage;
