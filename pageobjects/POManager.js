const { DashboardPage } = require('../pageobjects/DashboardPage');
const { LoginPage } = require('../pageobjects/LoginPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashboardPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashBoardPage;
    }
}

module.exports = { POManager };