const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    ws.on('message', (message) => {
        // Broadcast message to all connected clients
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
