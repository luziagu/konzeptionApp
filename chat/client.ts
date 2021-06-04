namespace highfiveApp {


    const messageField: HTMLInputElement = <HTMLInputElement>document.getElementById("nameLogin"); 

    messageField.addEventListener("keyup", function (evt: KeyboardEvent): void {
        if (evt.key === "Enter") {
          sendMessageToServer(messageField.value);
          messageField.value = ""; // clear message text field
        }

    });


    function sendMessageToServer(text: string): void {
        alert("Hello World"); 
        if (text !== null && text.length > 0) {
            const data: ClientMessage = {
              client: id,
              text: text,
            };
      
            sendPostRequest("/message", JSON.stringify(data));
    }
}
