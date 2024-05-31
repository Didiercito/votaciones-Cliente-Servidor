import { WebSocketServer } from 'ws';

export const wss = new WebSocketServer({ port:4000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado al WebSocket');

    ws.on('close', () => {
        console.log('Cliente desconectado del WebSocket');
    });

    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
    });
});
