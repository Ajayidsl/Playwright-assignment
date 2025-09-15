class ElementUtil {
  static async getText(page, locator) {
    return await page.locator(locator).innerText();
  }

  static async getValue(page, locator) {
    return await page.locator(locator).inputValue();
  }

  static async getAttribute(page, locator, attribute) {
    return await page.locator(locator).getAttribute(attribute);
  }

  static async isVisible(page, locator) {
    return await page.locator(locator).isVisible();
  }

  static async isEnabled(page, locator) {
    return await page.locator(locator).isEnabled();
  }

  static async selectDropdownByValue(page, locator, value) {
    await page.locator(locator).selectOption({ value });
  }

  static async selectDropdownByText(page, locator, text) {
    await page.locator(locator).selectOption({ label: text });
  }

  static async hover(page, locator) {
    await page.locator(locator).hover();
  }

  static async doubleClick(page, locator) {
    await page.locator(locator).dblclick();
  }

  static async rightClick(page, locator) {
    await page.locator(locator).click({ button: "right" });
  }
}

export default ElementUtil;
