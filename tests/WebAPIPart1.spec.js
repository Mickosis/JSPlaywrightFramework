const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
    };
const orderPayLoad = {
    orders: [{country: "Philippines", 
    productOrderedId: "6262e95ae26b7e1a10e89bf0"}]
    };
let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Browser Context Playwright Test', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderID))
        {
            rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetails = await page.locator(".-main").textContent();
    await page.pause();
    expect(response.orderID.includes(orderIDDetails)).toBeTruthy();
    await expect(page.locator(".email-preheader .tagline")).toHaveText("Thank you for Shopping With Us");
});