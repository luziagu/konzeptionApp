import * as WebSocket from "ws";

export namespace highfive {


    const port: number = Number(process.env.PORT);

    const server: WebSocket.Server = new WebSocket.Server({ port: port });

    const clientSockets: Set<WebSocket> = new Set();

    server.on("connection", (socket: any) => {
        socket.on("message", (message: string) => {
            for (let socket of clientSockets) {
                socket.send(message);
            }
        });
    })


}