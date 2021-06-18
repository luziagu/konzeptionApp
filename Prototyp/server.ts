
import * as Http from "http";

export namespace highfive {

   
   
    //const http = require('http');

// Create HTTP Server
// Recieve data from request
// Respond data in console and to body

let allPostData = "";





let port: number | string | undefined = process.env.PORT; 
    if (port == undefined )
    port = 5001; 
    
let server: Http.Server = Http.createServer();
    server.listen(port, () => console.log(`Server listening on port ${port}`));

console.log("Port: " + port);
startServer(port);


function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer(); 
    console.log(server); 

    console.log("Server starting on port:" + _port);   

    server.listen(_port); 
    server.addListener("request", handleRequest); 
}


function handleRequest(_request: any , _response: any) {
    let postData = "";
    _request.on('data', function (chunk: any) {
        postData += chunk;
    });

    _request.on('end', function (chunk: any) {
        console.log("hello!");
        console.log(_request.url);
        console.log(postData);

        allPostData += postData + "\n";

        _response.setHeader("content-type", "text/plain; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write(
            "URL: " + _request.url + "\n" +
            "POST-Data: " + postData + "\n" +
            "------ \n" + 
            "All POST-Data: \n" + allPostData);
        _response.end();
    });

}
}   