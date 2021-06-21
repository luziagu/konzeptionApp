"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var highfive;
(function (highfive) {
    const port = Number(process.env.PORT);
    const server = new WebSocket.Server({ port: port });
    const clientSockets = new Set();
    server.on("connection", (socket) => {
        socket.on("message", (message) => {
            for (let socket of clientSockets) {
                socket.send(message);
            }
        });
    });
})(highfive = exports.highfive || (exports.highfive = {}));
//# sourceMappingURL=server.js.map