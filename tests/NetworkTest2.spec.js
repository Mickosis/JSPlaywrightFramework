const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {
    userEmail: "tester@test.com.au",
    userPassword: "Tester1234!"
    };
const orderPayLoad = {
    orders: [{country: "Philippines", 
    productOrderedId: "6262e95ae26b7e1a10e89bf0"}]
    };
const fakePayloadOrders = {
    data: [],
    message: "No Orders"
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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62d39438e26b7e1a10f21527", route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62d1088ce26b7e1a10f1dc31'}));
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
});