import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartBadge: Locator;

constructor(page: Page) {
  this.page = page;
  this.cartIcon = page.locator('.shopping_cart_link');
  this.menuButton = page.locator('#react-burger-menu-btn');
  this.logoutLink = page.locator('#logout_sidebar_link');
  this.cartBadge = page.locator('.shopping_cart_badge');
}

private addButtonFor(productName: string): Locator {
  const slug = productName.toLowerCase().replace(/\s+/g, '-');  
  return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
}

async addProductToCart(productName: string) {
  await this.addButtonFor(productName).click();
}

async getCartCount() : Promise<string | null> {
  return await this.cartBadge.textContent();
}

async goToCart() {
  await this.cartIcon.click();
  await this.page.waitForURL(/cart.html/);
}

async logout() {
  await this.menuButton.click();
  await this.logoutLink.click();
}


}