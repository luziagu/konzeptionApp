"use strict";
var highfiveApp;
(function (highfiveApp) {
    let highfive;
    (function (highfive) {
        // get message text field and send button elements
        const Loginfield = document.getElementById("Namelogin");
        // send message on enter key
        Loginfield.addEventListener("keyup", function (evt) {
            if (evt.key === "Enter") {
                console.log(Loginfield.value + "hellu");
                document.location.href = "playmap.html";
                sendText(Loginfield.value);
                Loginfield.value = ""; // clear message text field
            }
        });
        function sendText(name) {
            if (name !== null && name.length > 0) {
                //Name in HTML Pushen!!
            }
            ;
            highfiveApp.sendPostRequest("/message", JSON.stringify(name));
            ; // function sendPostrequest aufrufen
        }
    })(highfive || (highfive = {}));
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