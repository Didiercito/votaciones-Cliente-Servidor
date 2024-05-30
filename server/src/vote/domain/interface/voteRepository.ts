
export interface VoteRepository {
    voteForCandidate(userId: string, candidateId: string): Promise<boolean>;
}
