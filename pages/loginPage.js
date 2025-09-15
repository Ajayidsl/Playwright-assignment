// pages/loginPage.js


class LoginPage {
    constructor(page) {
        this.page = page;

        // ----------------------------- Locators -----------------------------
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });

        // Post-login locators
        this.userProfileText = page.getByText('AutoUser1');
        this.projectsHeading = page.getByRole('heading', { name: /Projects/i });
        this.yourProjectsButton = page.getByRole('button', { name: /Your Projects/i });
        this.newProjectLink = page.getByRole('link', { name: 'New Project' });
    }

    // ----------------------------- Navigation -----------------------------
    async goto() {
        await this.page.goto('/account/signin');
    }

    // ----------------------------- Actions -----------------------------
    async enterUsername(username) {
        await this.usernameInput.fill(username);
        await this.nextButton.click();
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        this.loginButton.click();
    }

    async login(username, password) {
       
        await this.enterUsername(username);
        await this.enterPassword(password);


        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            this.clickLogin()
        ]);

        const continueButton = this.page.getByRole('link', { name: 'Continue' });

        try {
           
            await continueButton.waitFor({ state: 'visible', timeout: 10000 });
            await continueButton.click();
        } catch (e) {
            console.log('No "Continue" button found, proceeding...');
        }
    }
}

module.exports = LoginPage;
