namespace highfive { // name space to isolate identifiers from other examples

    export interface ClientMessage {
        text: string;
      }

    // get message text field and send button elements
    const Loginfield: HTMLInputElement = <HTMLInputElement>document.getElementById("Namelogin");
  
    // send message on enter key
    Loginfield.addEventListener("keyup", function (evt: KeyboardEvent): void {
      if (evt.key === "Enter") {
        console.log(Loginfield.value + "hellu")
        document.location.href ="playmap.html"
        sendText(Loginfield.value);
        Loginfield.value = ""; // clear message text field
        
      }
    });
function sendText(name: string): void {

  if (name !== null && name.length > 0) {
    //Name in HTML Pushen!!
    
    };

  sendPostRequest("/message", JSON.stringify(name));; // function sendPostrequest aufrufen
}
      
    } 


