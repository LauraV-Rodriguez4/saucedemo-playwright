import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Agregar un producto actualiza el contador del carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');
});