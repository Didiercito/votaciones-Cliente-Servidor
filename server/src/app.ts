import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';

import { authRouter } from '../src/auth/infraestructure/routes/authRoutes';
import { candidateRouter } from './candidate/infraestructure/routes/candidateRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT; 
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket) => { 
    console.log('Cliente conectado al WebSocket');

    const sendInterval = setInterval(() => {
        const data = JSON.stringify({ value: Math.random() });
        ws.send(data);
    }, 1000);

    ws.on('close', () => {
        console.log('Cliente desconectado del WebSocket');
        clearInterval(sendInterval); 
    });

    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
    });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/candidate', candidateRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: wss://localhost: ${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
