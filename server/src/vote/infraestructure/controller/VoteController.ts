import { Request, Response } from "express";
import { VoteUseCase } from "../../application/use-case/voteUseCase";
import { WebSocketServer } from "ws";

export class VoteController {
    constructor(private voteUseCase: VoteUseCase, private wss: WebSocketServer) {}

    async vote(req: Request, res: Response) {
        try {
            const { userId, candidateId } = req.body;
            const success = await this.voteUseCase.vote(userId, candidateId);

            if (success) {
                const payload = JSON.stringify({ event: 'vote', candidateId });
                this.wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(payload);
                    }
                });

                return res.status(200).json({
                    message: "Voto registrado exitosamente",
                    success: true
                });
            } else {
                return res.status(500).json({
                    message: "Error al procesar el voto",
                    success: false
                });
            }
        } catch (error) {
            console.error('Error al votar:', error);
            return res.status(500).json({
                message: "Error interno del servidor",
                success: false
            });
        }
    }
}
