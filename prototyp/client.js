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
            let challengeOverlay = document.getElementById("outputResponse");
            challengeOverlay.style.visibility = "visible";
            highfive.startChallenge.style.visibility = "visible";
            challengeOverlay.innerText += selector.toString();
            challengeOverlay.innerText += data.toString();
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
        let dataSend = { name: userName, data: " möchte dir eine Herausforderung senden \n" };
        socket.send(JSON.stringify(dataSend));
    }
    function handleChallengeOne() {
        console.log("click");
        let dataSend = { name: userName, data: " hat dir Folgende Herausforderung gesendet: Drehe dich im Kreis. \n" };
        socket.send(JSON.stringify(dataSend));
        highfive.overlayDiv.style.visibility = "hidden";
    }
    function handleChallengeTwo() {
        let dataSend = { name: userName, data: " hat dir Folgende Herausforderung gesendet: Singe ganz laut Alle meine Entchen. \n" };
        socket.send(JSON.stringify(dataSend));
        highfive.overlayDiv.style.visibility = "hidden";
    }
    function handleChallengeThree() {
        let dataSend = { name: userName, data: " hat dir Folgende Herausforderung gesendet: Klatsche drei mal laut in die Hände. \n" };
        socket.send(JSON.stringify(dataSend));
        highfive.overlayDiv.style.visibility = "hidden";
    }
    function createInputPW() {
        let sielanfrageButton = document.querySelector("#spielanfrageSenden");
        sielanfrageButton.addEventListener("pointerup", handleClick);
        highfive.challengeOne.addEventListener("pointerup", handleChallengeOne);
        highfive.challengeTwo.addEventListener("pointerup", handleChallengeTwo);
        highfive.challengeThree.addEventListener("pointerup", handleChallengeThree);
        let startBox = document.getElementById("start-screen");
        let Password = document.createElement("input");
        Password.type = "password";
        Password.setAttribute("class", "password");
        Password.placeholder = "Type in your password";
        startBox.appendChild(Password);
    }
    highfive.createInputPW = createInputPW;
    let Button = document.querySelector(".savename");
    Button.addEventListener("click", showname);
    let userName;
    function showname() {
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