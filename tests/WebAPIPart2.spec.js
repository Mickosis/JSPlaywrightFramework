const {test, expect} = require('@playwright/test');
let webContext;
const email = "anshika@gmail.com"

test.beforeAll(async ({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'})
})

test('Browser Context Playwright Test', async ()=>
{
    const productName = "zara coat 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerLink*='cart']").click();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('zara coat 3')").isVisible()).toBeTruthy();
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
    await expect(page.locator(".user__name label")).toHaveText(email);
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

test('Test Case 2', async ()=>
{
    const productName = "zara coat 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});