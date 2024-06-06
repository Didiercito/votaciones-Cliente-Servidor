// src/interfaces/controllers/VoteController.ts
import { Request, Response } from "express";
import { VoteUseCase, GetVotesUseCase, GetTotalVotesUseCase } from "../../application/use-case/voteUseCase";
import { WebSocketServer } from "ws";
import { VoteCredentials } from "../../domain/entities/voteCredentials";

let currentTotalVotes: number = 0;
const pendingRequests: Array<Response> = [];

export class VoteController {
    constructor(
        private voteUseCase: VoteUseCase, 
        private getVotesUseCase: GetVotesUseCase,
        private getTotalVotesUseCase: GetTotalVotesUseCase,
        private wss: WebSocketServer
    ) {}

    async vote(req: Request, res: Response) {
        try {
            const { candidateId } = req.body;
            const userId = req.params.id; 

            const voteCredentials = new VoteCredentials(userId, candidateId, 0);
            const success = await this.voteUseCase.vote(voteCredentials);

            if (success) {
                const payload = JSON.stringify({ event: 'vote', candidateId });
                this.wss.clients.forEach(client => {
                    client.send(payload);
                });

                // Notificar a todas las solicitudes pendientes de long polling
                currentTotalVotes += 1;  // Incrementa el contador total de votos
                while (pendingRequests.length > 0) {
                    const pendingRes = pendingRequests.pop();
                    if (pendingRes) {
                        pendingRes.status(200).json({
                            message: "Total de votos obtenido correctamente",
                            success: true,
                            totalVotes: currentTotalVotes
                        });
                    }
                }

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

    async getVotes(req: Request, res: Response) {
        try {
            const votes = await this.getVotesUseCase.getTotalVotesByCandidate();

            return res.status(200).json({
                message: "Votos obtenidos correctamente",
                success: true,
                votes
            });
        } catch (error) {
            console.error('Error al obtener los votos:', error);
            return res.status(500).json({
                message: "Error interno del servidor al obtener los votos",
                success: false
            });
        }
    }

    async getTotalVotes(req: Request, res: Response) {
        try {
            const totalVotes = await this.getTotalVotesUseCase.getTotalVotes();
            currentTotalVotes = totalVotes;

            pendingRequests.push(res);
        } catch (error) {
            console.error('Error al obtener el total de votos:', error);
            return res.status(500).json({
                message: "Error interno del servidor al obtener el total de votos",
                success: false
            });
        }
    }
}
