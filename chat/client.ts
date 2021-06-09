namespace highfiveApp {


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


    let userName: number = null; 
    const messageField: HTMLInputElement = <HTMLInputElement>document.getElementById("nameLogin"); 
    const idDiv: HTMLElement = <HTMLInputElement>document.getElementById("id");

    messageField.addEventListener("keyup", function (evt: KeyboardEvent): void {
        if (evt.key === "Enter") {
          sendMessageToServer(messageField.value);
          messageField.value = ""; // clear message text field
        }

    });

    getIdfromServer();

    async function getIdfromServer(): Promise<void> {
      try {
        const idStr: string = await sendGetRequest("/id"); // assign id to gloab variable (see above)
        idDiv.innerHTML = "#" + idStr; // display id on HTML page
        userName = parseInt(idStr);
      } catch (err) {
        console.error("fetch error: ", err);
      }
    }

    function sendMessageToServer(text: string): void {
        alert("Hello World"); 
        if (text !== null && text.length > 0) {
            const data: ClientMessage = {
              user: userName,
              text: text,
        };
        sendPostRequest("/message", JSON.stringify(data));
    
    }
            
  }

   
}
