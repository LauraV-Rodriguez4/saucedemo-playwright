import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login exitoso con usuario válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com'); 
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

});

test('login fallido: usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Sorry, this user has been locked out');
});

test('login fallido: contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', '1234');
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('Username and password do not match any user in this service');
});