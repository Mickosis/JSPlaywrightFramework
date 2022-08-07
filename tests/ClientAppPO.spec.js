const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")));

for(const data of dataSet)
{
test(`@Web Client App Login for ${data.productName}`, async ({page})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchAndAddProduct(data.productName);
    await dashBoardPage.navigateToCart();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('"+data.productName+"')").isVisible()).toBeTruthy();
    await page.locator("text=Checkout").click();  
    await page.locator("[placeholder*='Country']").click({ delay: 3000 });   
    const fields = page.locator(".field");
    await fields.first().waitFor();
    fieldsCount = await fields.locator("div").count();
    await fields.locator("input").nth(1).type("855");
    await fields.locator("input").nth(2).type("Mico Rigunay"); 
    await page.locator("[placeholder*='Country']").type("ind", { delay:500 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i)
    {
        text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name label")).toHaveText(data.username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID))
        {
            rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetails = await page.locator(".-main").textContent();
    expect(orderID.includes(orderIDDetails)).toBeTruthy();
    await expect(page.locator(".email-preheader .tagline")).toHaveText("Thank you for Shopping With Us");
    // await page.pause();
});
};

customtest(`Client App Login`, async ({page, testDataForOrder})=>
{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchAndAddProduct(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('zara coat 3')").isVisible()).toBeTruthy();
    await page.locator("text=Checkout").click();  
});