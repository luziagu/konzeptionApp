namespace highfiveApp {

    export interface ClientMessage {
        user: number;
        text: string;

    }

    const serverURL: string = "https://highfivekonzeption.herokuapp.com"; 

    export async function sendGetRequest(url: string): Promise<string> {
        const response: Response = await fetch(serverURL + url, {
          method: "GET",
          headers: { "Content-Type": "text/plain" },
        });
    
        if (response.status !== 200)
          return Promise.reject(response.statusText);
    
    
        return response.text();
      }
    
      export async function sendPostRequest(url: string, body: string): Promise<string> {
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
