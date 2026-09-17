import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('Agregar un producto y se actualiza el contador del carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  const cartCount = await inventoryPage.getCartCount();
  expect(cartCount).toBe('1');
});

test('Agregar varios productos y que se reflejen en el carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage (page);
  await page.goto('https://www.saucedemo.com'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  await inventoryPage.goToCart();
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBe(2);
});

test('Remover un producto del carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage (page);
  await page.goto('https://www.saucedemo.com'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.removeProduct('Sauce Labs Backpack');
  const itemCount = await cartPage.getItemCount();
  expect(itemCount).toBe(0);
});