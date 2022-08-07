class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
        this.signInButton = page.locator("[value='Login']");        
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username, password)
    {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = { LoginPage };