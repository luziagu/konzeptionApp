
import * as Http from "http";
import * as Url from "url"; 

export namespace highfive {

   
   
    //const http = require('http');

// Create HTTP Server
// Recieve data from request
// Respond data in console and to body

  
    let server: Http.Server = Http.createServer();
    let port: number | string | undefined = process.env.PORT; 
        if (port == undefined )
        port = 5001; 

    console.log("Port: " + port);
    server.listen(port);
    server.addListener("request", handleRequest); 



    function handleRequest(_request: any , _response: any) {
        
        
            console.log("hello!");
            

            _response.setHeader("content-type", "text/plain; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");

            if (_request.url) {
                let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); 
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key]+ "<br/>");
                }
                let jsonString:string = JSON.stringify(url.query); 
                _response.write(jsonString);
            }
            
            _response.end();
       

    }   
}   