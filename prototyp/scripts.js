"use strict";
var highfive;
(function (highfive) {
    // let boolean= false;
    const pointsDiv = document.getElementById("points");
    const userPointDiv = document.querySelector(".point.user");
    const paulPointDiv = document.querySelector(".point.paul");
    const luisaPointDiv = document.querySelector(".point.luisa");
    const Profile = document.querySelector(".myProfile");
    const top = document.querySelector(".thumbsup");
    const userTextDiv = document.querySelector(".text-field.user");
    const paulTextDiv = document.querySelector(".text-field.paul");
    const luisaTextDiv = document.querySelector(".text-field.luisa");
    const points = [
        { label: "Kevin", element: userPointDiv, text: userTextDiv, latitude: 0, longitude: 0 },
        { label: "Paul", element: paulPointDiv, text: paulTextDiv, latitude: 48.049993, longitude: 8.210727 },
        { label: "Luisa", element: luisaPointDiv, text: luisaTextDiv, latitude: 48.095364, longitude: 8.154895 },
    ];
    //userPointDiv.addEventListener("touchend", Answer);
    // paulPointDiv.addEventListener("touchend", Answer);
    // luisaPointDiv.addEventListener("mouseup", Answer);
    top.addEventListener("click", Countfive);
    // create start screen and register 
    const geoLocationManager = new GeoLocationManager();
    geoLocationManager.onLocation = onLoction;
    // create start screen and register web audio manager
    const startScreen = new StartScreen("start-screen");
    startScreen.addResourceManager(geoLocationManager);
    // start (creates audio context )
    startScreen.start();
    window.addEventListener("resize", calculatePoints);
    // async function Answer(_event) {
    //   let dataServer = JSON.stringify("Luzia hat eine Spielanfrage gesendet. Möchtest du sie annehmen?"); //wandelt Array in einen JSON string um, damit der Server es lesen kann 
    //   let query = new URLSearchParams(dataServer); //query aus den Daten kreieren 
    //   let response = await fetch(url + "?safeImage&name=" + "&" + query.toString()); //(await) warten bis fetch die Daten hat
    //   let texte = await response.text(); //text() liefert mir nicht direkt einen string, sondern nur die Promise einen string zu liefern, wenn sie die Daten hat (solage warten ->await)
    //   console.log("Juhu");
    //   alert("Paul hat die Spielanfrage angenommen!");
    //boolean = true,
    //if boolean == true, dann nächste aktion
    // }
    function onLoction(coord, timestamp) {
        const userPoint = points[0];
        userPoint.latitude = coord.latitude;
        userPoint.longitude = coord.longitude;
        if (userPoint.label === "Kevin") {
            userPoint.element.classList.add("breathe");
            setTimeout(() => userPoint.element.classList.remove("breathe"), 250);
        }
        calculatePoints();
    }
    // let Credits: any = document.querySelector("#creditpoints"); 
    // // let Inhalt: number = Credits.innerHTML;
    // let five: number = 0;
    // //Bei click
    // five += 5; 
    // if (five != 0) {
    // Credits.innerHTML = five + "";
    function Countfive() {
        let Credits = document.querySelector("#creditpoints");
        let index = 0 + parseInt(Credits.innerHTML);
        index += 5;
        if (index != 0) {
            Credits.innerHTML = index + "";
            // }
            // alert(String.fromCodePoint(0x1f389) +  "Congratulations, You gained a Credit Point!")
        }
    }
    function calculatePoints() {
        let maxLatitude = -Infinity;
        let minLatitude = Infinity;
        let maxLongitude = -Infinity;
        let minLongitude = Infinity;
        for (let point of points) {
            maxLatitude = Math.max(maxLatitude, point.latitude);
            minLatitude = Math.min(minLatitude, point.latitude);
            maxLongitude = Math.max(maxLongitude, point.longitude);
            minLongitude = Math.min(minLongitude, point.longitude);
        }
        const margin = 40;
        const rect = pointsDiv.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const size = Math.min(width, height);
        const xMargin = margin + 0.5 * (width - size);
        const yMargin = margin + 0.5 * (height - size);
        const distLatitude = maxLatitude - minLatitude;
        const distLongitude = maxLongitude - minLongitude;
        const scaleX = (size - 2 * margin) / distLongitude;
        const scaleY = (size - 2 * margin) / distLatitude;
        for (let point of points) {
            const x = xMargin + scaleX * (point.longitude - minLongitude);
            const y = yMargin + scaleY * (point.latitude - minLatitude);
            point.element.style.left = `${x}px`;
            point.element.style.bottom = `${y}px`;
            point.text.innerHTML = `${point.label}: ${point.latitude.toFixed(3)}, ${point.longitude.toFixed(3)}`;
        }
    }
})(highfive || (highfive = {}));
//# sourceMappingURL=scripts.js.map