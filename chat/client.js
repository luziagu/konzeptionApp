"use strict";
var highfiveApp;
(function (highfiveApp) {
    let userName = null;
    const messageField = document.getElementById("nameLogin");
    const idDiv = document.getElementById("id");
    messageField.addEventListener("keyup", function (evt) {
        if (evt.key === "Enter") {
            sendMessageToServer(messageField.value);
            messageField.value = ""; // clear message text field
        }
    });
    getIdfromServer();
    async function getIdfromServer() {
        try {
            const idStr = await highfiveApp.sendGetRequest("/id"); // assign id to gloab variable (see above)
            idDiv.innerHTML = "#" + idStr; // display id on HTML page
            userName = parseInt(idStr);
        }
        catch (err) {
            console.error("fetch error: ", err);
        }
    }
    function sendMessageToServer(text) {
        alert("Hello World");
        if (text !== null && text.length > 0) {
            const data = {
                user: userName,
                text: text,
            };
            highfiveApp.sendPostRequest("/message", JSON.stringify(data));
        }
    }
})(highfiveApp || (highfiveApp = {}));
//# sourceMappingURL=client.js.map