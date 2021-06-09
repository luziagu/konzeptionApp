"use strict";
var highfive;
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
        highfive.sendPostRequest("/message", JSON.stringify(name));
        ; // function sendPostrequest aufrufen
    }
})(highfive || (highfive = {}));
//# sourceMappingURL=client.js.map