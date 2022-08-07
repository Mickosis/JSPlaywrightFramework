class APIUtils
{

    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayLoad
        })
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);

        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
        const orderRequest = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization':  response.token,
                'Content-Type': 'application/json'
            },
        });
        const orderResponse = await orderRequest.json();
        console.log(orderResponse);
        const orderID = orderResponse.orders[0];
        response.orderID = orderID;
        console.log(orderID);

        return response;
    }
}

module.exports = {APIUtils};