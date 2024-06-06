import { Request, Response } from "express";
import { VoteUseCase, GetVotesUseCase, GetTotalVotesUseCase } from "../../application/use-case/voteUseCase";
import { WebSocketServer } from "ws";
import { VoteCredentials } from "../../domain/entities/voteCredentials";

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

                // Fetch total votes after a successful vote
                const totalVotes = await this.getTotalVotesUseCase.getTotalVotes();

                return res.status(200).json({
                    message: "Voto registrado exitosamente",
                    success: true,
                    totalVotes
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
            res.status(200).json({
                message: "Total de votos obtenido correctamente",
                success: true,
                totalVotes
            });
        } catch (error) {
            console.error('Error al obtener el total de votos:', error);
            return res.status(500).json({
                message: "Error interno del servidor al obtener el total de votos",
                success: false
            });
        }
    }
}