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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca", async route => {
        const response = await page.request.fetch(route.request());
        let body = fakePayloadOrders;
        route.fulfill({
            response, 
            body,
        });
    });
    await page.pause();
    await page.locator("button[routerLink*='myorders']").click();
    await page.pause();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");



});