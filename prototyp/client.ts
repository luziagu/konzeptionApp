namespace highfive { // name space to isolate identifiers from other examples

  export interface ClientMessage {
    text: string;
  }
  interface Message {
    name: string;
    data: string;
  }
  let socket: WebSocket = new WebSocket("wss://highfivekonzeption.herokuapp.com/");

  window.addEventListener("load", createInput);
  window.addEventListener("load", createInputPW);
  socket.addEventListener("message", handleload);

  function handleload(message: any): void {
    let carrier: Message = <Message>JSON.parse(message.data);
    let selector: string = carrier.name;
    let data: string = carrier.data;
    if (selector != userName){
      console.log(message.data);
      alert(message.data)
    }
  }

  function createInput(): void {


    let startBox: HTMLDivElement = <HTMLDivElement>document.getElementById("start-screen")
    let NameInput: HTMLInputElement = document.createElement("input");
    NameInput.type = "text";
    NameInput.setAttribute("class", "inputname");
    NameInput.placeholder = "Type in your Name";
    startBox.appendChild(NameInput)


  }

  function handleClick(): void {
    let dataSend: Message = { name: userName, data: "möchte dir eine Herausforderung senden" }
    socket.send(JSON.stringify(dataSend));

  }

  function createInputPW(): void {

    let startBox: HTMLDivElement = <HTMLDivElement>document.getElementById("start-screen")
    let Password: HTMLInputElement = document.createElement("input");
    Password.type = "password";
    Password.setAttribute("class", "password");
    Password.placeholder = "Type in your password";
    startBox.appendChild(Password)


  }

  let Button: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".savename");

  Button.addEventListener("click", showname);

  let userName: string;
  function showname(evt: Event): void {
    let sielanfrageButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#spielanfrageSenden")
    sielanfrageButton.addEventListener("pointerup", handleClick);
    let NameInput: HTMLInputElement = <HTMLInputElement>document.querySelector(".inputname");
    let Div: HTMLDivElement = <HTMLDivElement>document.getElementById("text-fields");
    let name = document.createElement("div");
    name.setAttribute("class", "logname");
    Div.appendChild(name);

    name.innerHTML = NameInput.value;//Prinzip funktioniert
    userName = NameInput.value;

  }

}
