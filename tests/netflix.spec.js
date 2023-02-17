const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test("my first test", async ({ page }) => {
  // go to Netflix.com
  await page.goto("https://www.netflix.com");

  // assert page title appears
  await expect(page.locator('[data-uia="hero-title"]')).toHaveText(
    "Unlimited movies, TV shows, and more."
  );
});

// ADD YOUR TESTS HERE!
// Valid log in credentials:
// Email: safitri@myemail.com
// Password: password

// Parameterized test data
const invalidEmail = [{
  email: 'safitri',
  password: 'password'
},
{
  email: 'saf@myemail.com',
  password: '1234'
}];



// 1. Failed log in scenario using invalidEmail test data above
invalidEmail.forEach(data => {
  test(`failed log in ${data.email}`, async ({ page }) => {
    // Go to Netflix.com
    await page.goto("https://www.netflix.com");
  
    // Click Sign in link
    await page.getByRole('link', { name: /Sign In/ }).click();
  
    // Click and fill the Email field with valid email
    await page.getByText('Email or phone number').click();
    await page.getByLabel('Email or phone number').fill(data.email);
  
    // Click and fill the Password field with valid pasword
    await page.getByText('Password').click();
    await page.getByLabel('Password').fill(data.password);
  
    // Click sign in button
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    // Verify that there is error message when log in is failed
    await expect(page.locator('[data-uia="text"]')).toHaveText(
      'Sorry, we can\'t find an account with this email address. Please try again or create a new account.'
    );
  });
});

// 1. Failed log in scenario using invalid password
invalidEmail.forEach(data => {
  test(`failed log in ${data.email}`, async ({ page }) => {
    // Go to Netflix.com
    await page.goto("https://www.netflix.com");
  
    // Click Sign in link
    await page.getByRole('link', { name: /Sign In/ }).click();
  
    // Click and fill the Email field with valid email
    await page.getByText('Email or phone number').click();
    await page.getByLabel('Email or phone number').fill('safitri@myemail.com');
  
    // Click and fill the Password field with valid pasword
    await page.getByText('Password').click();
    await page.getByLabel('Password').fill(data.password);
  
    // Click sign in button
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    // Verify that there is error message when log in is failed
    await expect(page.locator('[data-uia="text"]')).toHaveText(
      'Sorry, we can\'t find an account with this email address. Please try again or create a new account.'
    );
  });
})


// 3. Successful log in scenario when email/password combination is valid
test('successful log in', async ({ page }) => {
  // Go to Netflix.com
  await page.goto("https://www.netflix.com");

  // Click Sign in link
  await page.getByRole('link', { name: 'Sign In' }).click();

  // Click and fill the Email field with valid email
  await page.getByText('Email or phone number').click();
  await page.getByLabel('Email or phone number').fill('safitri@myemail.com');

  // Click and fill the Password field with valid pasword
  await page.getByText('Password').click();
  await page.getByLabel('Password').fill('password');

  // Click sign in button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify that there is Sign out link on the page
  await expect(page.locator('[data-uia="header-signout-link"]')).toHaveText('Sign Out');
});