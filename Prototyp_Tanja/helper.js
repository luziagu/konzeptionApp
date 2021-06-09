"use strict";
var highfive;
(function (highfive) {
    const serverURL = "https://highfivekonzeption.herokuapp.com";
    async function sendGetRequest(url) {
        const response = await fetch(serverURL + url, {
            method: "GET",
            headers: { "Content-Type": "text/plain" },
        });
        if (response.status !== 200)
            return Promise.reject(response.statusText);
        return response.text();
    }
    highfive.sendGetRequest = sendGetRequest;
    async function sendPostRequest(url, body) {
        const response = await fetch(serverURL + url, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: body,
        });
        if (response.status !== 200)
            return Promise.reject(response.statusText);
        return response.text();
    }
    highfive.sendPostRequest = sendPostRequest;
})(highfive || (highfive = {}));
//# sourceMappingURL=helper.js.map