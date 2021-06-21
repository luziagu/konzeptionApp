"use strict";
var highfive;
(function (highfive) {
    let socket = new WebSocket("wss://highfivekonzeption.herokuapp.com/");
    window.addEventListener("load", createInput);
    window.addEventListener("load", createInputPW);
    socket.addEventListener("message", handleload);
    function handleload(message) {
        console.log(message.data);
    }
    function createInput() {
        let sielanfrageButton = document.querySelector("#spielanfrageSenden");
        sielanfrageButton.addEventListener("pointerup", handleClick);
        let startBox = document.getElementById("start-screen");
        let NameInput = document.createElement("input");
        NameInput.type = "text";
        NameInput.setAttribute("class", "inputname");
        NameInput.placeholder = "Type in your Name";
        startBox.appendChild(NameInput);
    }
    function handleClick() {
        socket.send(JSON.stringify("Du hast eine Neue Spielanfrage"));
    }
    function createInputPW() {
        let startBox = document.getElementById("start-screen");
        let Password = document.createElement("input");
        Password.type = "password";
        Password.setAttribute("class", "password");
        Password.placeholder = "Type in your password";
        startBox.appendChild(Password);
    }
    let Button = document.querySelector(".savename");
    Button.addEventListener("click", showname);
    function showname(evt) {
        let NameInput = document.querySelector(".inputname");
        let Div = document.getElementById("text-fields");
        let name = document.createElement("div");
        name.setAttribute("class", "logname");
        Div.appendChild(name);
        name.innerHTML = NameInput.value; //Prinzip funktioniert
    }
})(highfive || (highfive = {}));
//# sourceMappingURL=client.js.map