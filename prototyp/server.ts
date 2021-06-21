import * as WebSocket from "ws";

export namespace highfive {

    interface Message {
        name: string;
        data: string;
    }
    const port: number = Number(process.env.PORT);

    const server: WebSocket.Server = new WebSocket.Server({ port: port });

    const clientSockets: Set<WebSocket> = new Set();

    server.on("connection", (socket: any) => {
        clientSockets.add(socket);
        socket.on("message", (message: Message) => {
            for (let socket of clientSockets) {
                socket.send(message);
            }
        });
    })


}