const {test, expect} = require('@playwright/test');

test('@Web Browser Context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    // page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a")
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    // locator rules:
    // if id is present: tagname#id or #id
    // if class attribute is present: tagname.class or .class
    // css based on any attribute: [attribute='value']
    // css with traversing from Parent to Child: parenttagname >> childtagname
    // needs to write locator based on text: text=''

    await userName.type("mickosis");
    await password.type("learning");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");

    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    );

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const documentLink = page.locator("[href*='documents-request']");
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");    
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();  
    // await page.pause();
    await page.locator("#okayBtn").click();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test('Child Windows Handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),

    ])

    text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await userName.type(domain);
    await page.pause();
    console.log(await userName.textContent());

});

test('test', async ({ page }) => {

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Click [aria-label="Search"]
  await page.locator('[aria-label="Search"]').click();

  // Fill [aria-label="Search"]
  await page.locator('[aria-label="Search"]').fill('rahul shetty academy');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.google.com/search?q=rahul+shetty+academy&source=hp&ei=zyytYu_gINbN-QaskZPwAw&iflsig=AJiK0e8AAAAAYq063wYZRPi67SuKBaxYNseJsraFVgN-&ved=0ahUKEwivhIeI77X4AhXWZt4KHazIBD4Q4dUDCAc&uact=5&oq=rahul+shetty+academy&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOg4ILhCPARDqAhCMAxDlAjoOCAAQjwEQ6gIQjAMQ5QI6DgguEIAEELEDEIMBENQCOggILhCxAxCDAToLCAAQgAQQsQMQgwE6CAgAELEDEIMBOhEILhCABBCxAxCDARDHARDRAzoICAAQgAQQsQM6EQguEIAEELEDEIMBEMcBEK8BOg4ILhCABBCxAxDHARDRAzoICC4QgAQQ1AI6BQguEIAEOgsILhCABBCxAxCDAToICC4QgAQQsQNQyglYuSNg9CdoAXAAeACAAXiIAZsOkgEEMTcuM5gBAKABAbABCg&sclient=gws-wiz' }*/),
    page.locator('[aria-label="Search"]').press('Enter')
  ]);

  // Click text=Rahul Shetty Academyhttps://rahulshettyacademy.com >> h3
  await page.locator('text=Rahul Shetty Academyhttps://rahulshettyacademy.com >> h3').click();
  await expect(page).toHaveURL('https://rahulshettyacademy.com/');

  // Click text=Access to All Courses
  await page.locator('text=Access to All Courses').click();
  await expect(page).toHaveURL('https://rahulshettyacademy.com/lifetime-access');

});