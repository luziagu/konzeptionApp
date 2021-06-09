namespace highfive { // name space to isolate identifiers from other examples
    // client message interface
    export interface ClientMessage {
      text: string;
    }
  
    const serverURL: string = "https://highfivekonzeption.herokuapp.com";
  
    export async function sendGetRequest(url: string): Promise<string> {//nimmt die Daten von sendPostRequest an 
      const response: Response = await fetch(serverURL + url, {
        method: "GET",
        headers: { "Content-Type": "text/plain" },
      });
  
      if (response.status !== 200)
        return Promise.reject(response.statusText);
  
      return response.text();
    }
  
    export async function sendPostRequest(url: string, body: string): Promise<string> { //Postet den Inhalt von Inputfeld 
      const response: Response = await fetch(serverURL + url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: body,
      });
  
      if (response.status !== 200)
        return Promise.reject(response.statusText);
        return response.text();
    }
  }