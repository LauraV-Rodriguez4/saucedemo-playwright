import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

constructor(page: Page) {
  this.page = page;
  this.cartItems = page.locator('.cart_item');
  this.checkoutButton = page.locator('#checkout');
}

async removeProduct(productName: string) {
  const slug = productName.toLowerCase().replace(/\s+/g, '-');  
  await this.page.locator(`[data-test="remove-${slug}"]`).click();
}

async getItemCount() : Promise<number> {
  return this.cartItems.count(); 
}






}