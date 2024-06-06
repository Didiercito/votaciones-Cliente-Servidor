// src/application/use-case/voteUseCase.ts
import { VoteRepository } from "../../domain/interface/voteRepository";
import { VoteCredentials } from "../../domain/entities/voteCredentials";

export class VoteUseCase {
    constructor(private voteRepository: VoteRepository) {}

    async vote(voteCredentials: VoteCredentials): Promise<boolean> {
        try {
            return await this.voteRepository.voteForCandidate(voteCredentials.userId, voteCredentials.candidateId);
        } catch (error) {
            console.error('Error al procesar el voto:', error);
            return false;
        }
    }
}

export class GetVotesUseCase {
    constructor(private voteRepository: VoteRepository) {}

    async getTotalVotesByCandidate(): Promise<Map<string, number>> {
        try {
            return await this.voteRepository.getTotalVotesByCandidate();
        } catch (error) {
            console.error('Error al obtener los votos:', error);
            return new Map<string, number>();
        }
    }
}

export class GetTotalVotesUseCase {
    constructor(private voteRepository: VoteRepository) {}

    async getTotalVotes(): Promise<number> {
        try {
            return await this.voteRepository.getTotalVotes();
        } catch (error) {
            console.error('Error al obtener el total de votos:', error);
            return 0;
        }
    }
}
