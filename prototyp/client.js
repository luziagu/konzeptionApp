"use strict";
var highfive;
(function (highfive) {
    let socket = new WebSocket("wss://highfivekonzeption.herokuapp.com/");
    window.addEventListener("load", createInput);
    window.addEventListener("load", createInputPW);
    socket.addEventListener("message", handleload);
    function handleload(message) {
        let carrier = JSON.parse(message.data);
        let selector = carrier.name;
        let data = carrier.data;
        if (selector != userName) {
            console.log(message.data);
        }
    }
    function createInput() {
        let startBox = document.getElementById("start-screen");
        let NameInput = document.createElement("input");
        NameInput.type = "text";
        NameInput.setAttribute("class", "inputname");
        NameInput.placeholder = "Type in your Name";
        startBox.appendChild(NameInput);
    }
    function handleClick() {
        let dataSend = { name: userName, data: "Du hast eine Neue Spielanfrage" };
        socket.send(JSON.stringify(dataSend));
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
    let userName;
    function showname(evt) {
        let sielanfrageButton = document.querySelector("#spielanfrageSenden");
        sielanfrageButton.addEventListener("pointerup", handleClick);
        let NameInput = document.querySelector(".inputname");
        let Div = document.getElementById("text-fields");
        let name = document.createElement("div");
        name.setAttribute("class", "logname");
        Div.appendChild(name);
        name.innerHTML = NameInput.value; //Prinzip funktioniert
        userName = NameInput.value;
    }
})(highfive || (highfive = {}));
//# sourceMappingURL=client.js.map