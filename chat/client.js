"use strict";
var highfiveApp;
(function (highfiveApp) {
    const messageField = document.getElementById("nameLogin");
    messageField.addEventListener("keyup", function (evt) {
        if (evt.key === "Enter") {
            sendMessageToServer(messageField.value);
            messageField.value = ""; // clear message text field
        }
    });
    function sendMessageToServer(text) {
        alert("Hello World");
        if (text !== null && text.length > 0) {
            const data = {
                client: id,
                text: text,
            };
            sendPostRequest("/message", JSON.stringify(data));
        }
    }
})(highfiveApp || (highfiveApp = {}));
//# sourceMappingURL=client.js.map