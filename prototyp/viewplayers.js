"use strict";
//fertig, erstellt die Namen dann auf der Map als HTML Elemente!
var highfive;
(function (highfive) {
    const PlayerlistDiv = document.getElementById("player-list");
    setInterval(getPlayerListfromServer, 1000);
    async function getPlayerListfromServer() {
        try {
            // send request and receive player list as response
            const PlayerListStr = await highfive.sendGetRequest("player-list");
            const PlayerList = JSON.parse(PlayerListStr);
            let htmlStr = "<table>";
            // compose list of text paragraphs from message list
            for (let message of PlayerList) {
                htmlStr += `<tr><td class="col-0">#${message}:</td><td>${message.text}</td></tr>`;
            }
            htmlStr += "</table>";
            // display message list in div in HTML
            PlayerlistDiv.innerHTML = htmlStr;
        }
        catch (err) {
            console.error("fetch error: ", err);
        }
    }
})(highfive || (highfive = {}));
//# sourceMappingURL=viewplayers.js.map