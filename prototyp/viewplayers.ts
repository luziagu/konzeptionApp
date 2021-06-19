//fertig, erstellt die Namen dann auf der Map als HTML Elemente!

namespace highfive{

const PlayerlistDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("player-list");

setInterval(getPlayerListfromServer, 1000);

async function getPlayerListfromServer(): Promise<void> {//baut aus den Daten dann ein sichtbares HTML Element
    try {
      // send request and receive player list as response
      const PlayerListStr: string = await sendGetRequest("player-list");
      const PlayerList: Array<ClientMessage> = JSON.parse(PlayerListStr);
      let htmlStr: string = "<table>";

      // compose list of text paragraphs from message list
      for (let message of PlayerList) {
        htmlStr += `<tr><td class="col-0">#${message}:</td><td>${message.text}</td></tr>`;
      }

      htmlStr += "</table>";
      // display message list in div in HTML
      PlayerlistDiv.innerHTML = htmlStr;
    } catch (err) {
      console.error("fetch error: ", err);
    }
  }


}