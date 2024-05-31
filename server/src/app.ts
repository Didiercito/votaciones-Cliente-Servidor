import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { seedingCandidates } from './seed/partyPoliticSeeder';
import { authRouter } from './auth/infraestructure/routes/authRoutes';
import { candidateRouter } from './candidate/infraestructure/routes/candidateRoutes';
import { voteRouter } from './vote/infraestructure/routes/voteRoutes';
import { wss } from './ws/ws';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

seedingCandidates().catch(console.error);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/candidate', candidateRouter);
app.use('/api/v1/vote', voteRouter);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
