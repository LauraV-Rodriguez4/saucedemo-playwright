import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Step One (checkout-step-one.html)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step Two (checkout-step-two.html)
  readonly summaryTotalLabel: Locator;
  readonly finishButton: Locator;

  // Complete (checkout-complete.html)
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');

    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');

    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToStepTwo() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  async getTotalText(): Promise<string | null> {
    await this.summaryTotalLabel.waitFor();
    return await this.summaryTotalLabel.textContent();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getCompleteHeaderText(): Promise<string | null> {
    await this.completeHeader.waitFor();
    return await this.completeHeader.textContent();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}
