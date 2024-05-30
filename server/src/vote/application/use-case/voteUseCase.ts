import { VoteRepository } from "../../domain/interface/voteRepository";

export class VoteUseCase {
    constructor(readonly voteRepository: VoteRepository) { }

    async vote(userId: string, candidateId: string): Promise<boolean> {
        try {
            return await this.voteRepository.voteForCandidate(userId, candidateId);
        } catch (error) {
            console.error('Error al procesar el voto:', error);
            return false;
        }
    }
}
