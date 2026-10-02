import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Completar el flujo de checkout y ver el mensaje de confirmación', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.goToCheckout();

  await checkoutPage.fillInformation('Vale', 'Rodriguez', '1234');
  await checkoutPage.continueToStepTwo();
  await checkoutPage.finish();

  const completeHeaderText = await checkoutPage.getCompleteHeaderText();
  expect(completeHeaderText).toBe('Thank you for your order!');
});
