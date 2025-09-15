import { test, expect } from '@playwright/test';

class ProjectPage {
    constructor(page) {
        this.page = page;

        // ----------------------------- Locators -----------------------------
        this.usernameProfile = page.locator('//button[@id="userInfoMenus"]');
        this.projectName = page.getByText('QA ACL Resesarch1', { exact: true });
    }

    // ----------------------------- Actions -----------------------------
    async clickProjectName() {
        for (let i = 0; i < 3; i++) {
            try {
                await expect(this.projectName).toBeVisible({ timeout: 20000 });
                await this.projectName.click();
                break; // success
            } catch (e) {
                console.log(`Retry ${i + 1}: project link not ready yet...`);
                if (i === 2) throw e; // give up after 3 tries
            }
        }
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async validatePageTitle(expectedTitle) {
        await this.page.waitForFunction(
            (title) => document.title.includes(title),
            expectedTitle,
            { timeout: 20000 }
        );

        const actualTitle = await this.getPageTitle();
        expect.soft(actualTitle).toContain(expectedTitle);
    }
}

module.exports = ProjectPage;
