//Field Page

        this.fieldButton = page.getByRole('link', { name: 'Fields' });
        this.newFieldButton = page.getByRole('button', { name: 'New Field' });
        this.nameInput = page.getByPlaceholder('Name');
        this.lengthField = page.locator('label[data-label="Length"] input[type="tel"]');
        this.createFieldBtn = page.getByRole('button', { name: 'Create Field' });
        this.tableRows = page.locator('table.k-grid-table tbody tr');

//Login Page    
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });

        this.userProfileText = page.getByText('AutoUser1');
        this.projectsHeading = page.getByRole('heading', { name: /Projects/i });
        this.yourProjectsButton = page.getByRole('button', { name: /Your Projects/i });
        this.newProjectLink = page.getByRole('link', { name: 'New Project' });

//Project Page
        this.usernameProfile = page.locator('//button[@id="userInfoMenus"]');this.usernameProfile = page.locator('//button[@id="userInfoMenus"]');
        this.projectName = page.getByText('QA ACL Resesarch1', { exact: true });
  
//Records Page
        this.recordsButton = page.getByRole('link', { name: 'Records' });
        this.primaryRecordsButton = page.getByText('Primary');
        this.checkAll = page.getByRole('checkbox', { name: 'Select All' });
        this.massActionButton = page.locator('//button[@id="toggle_mass_action"]');
        this.editButton = page.locator('#ma-action-radio-edit');
        this.nextButton = page.locator('//button[@id="maButton-Next"]');
        this.dropdown = page.locator('span[role="combobox"][aria-label="Field"]');
        this.fieldname = page.getByRole('option', { name: 'LT FIELD1' });
        this.textArea = page.getByRole('textbox', { name: 'Replace Text' });
        this.massActionButton = page.getByRole('button', { name: ' ' });
        this.editRadio = page.getByRole('radio', { name: 'Edit' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.goButton = page.locator('#maButton-Go');
        this.yesButton = page.getByRole('button', { name: 'Yes' });
        this.fieldDropdown = page.getByRole('combobox', { name: 'Field', exact: true }).locator('span').nth(1);
        this.replaceTextBox = page.getByRole('textbox', { name: 'Replace Text' });
        this.massActionHistoryButton = page.locator('//button[@id="toggle_mass_action_history"]');
        this.firstRow = page.locator("tbody tr").first();
        this.tableRows = page.locator('tbody[role="rowgroup"] tr');
        this.closeModalButton = this.page.getByRole('button', { name: 'Close' }).first();
        this.rowSelector = (fieldName) => `//div[contains(@class,'table-row') and .//span[text()='${fieldName}']]`;
        this.highlightedSpan = '.Wordmark';
        this.notificationButton = page.locator('#indexNotification');
        this.searchBar = page.locator("//input[@id='search_builder_input_widget_datastore_0']");
        this.goToDocumentButton = page.getByRole('button', { name: 'Go to Document View' });
        this.recordsButton = page.locator("//span[@class='k-button-text'][normalize-space()='Records']");
        this.clearSearch = page.locator("//button[@title='Clear Search']");