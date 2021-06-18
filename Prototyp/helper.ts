//Vstellt Verbindung zu Server her

namespace highfive { // name space to isolate identifiers from other examples
    // client message interface
    export interface ClientMessage {
      text: string;
    }
  
    const serverURL: string = "https://highfivekonzeption.herokuapp.com";
  
    export async function sendGetRequest(url: string): Promise<string> {//nimmt die Daten von sendPostRequest an 
      const response: Response = await fetch(serverURL + url, {
        method: "GET", //in url übergeben, url länge ist aber begrenzt
        headers: { "Content-Type": "text/plain" },
      });
  
      if (response.status !== 200)
        return Promise.reject(response.statusText);
  
      return response.text();
    }
  
    export async function sendPostRequest(url: string, body: string): Promise<string> { //sendet den Inhalt von Inputfeld 
      const response: Response = await fetch(serverURL + url, { //url= /message aus vorheriger Funktion sendMessage
        method: "POST",//
        headers: { "Content-Type": "text/plain" },
        body: body, //pusht den Name in den body!
      });
  
      if (response.status !== 200)
        return Promise.reject(response.statusText);
        return response.text();
    }
  }