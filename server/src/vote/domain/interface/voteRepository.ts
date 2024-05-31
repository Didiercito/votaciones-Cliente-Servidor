
export interface VoteRepository {
    voteForCandidate(userId: string, candidateId: string): Promise<boolean>;
    getTotalVotesByCandidate(): Promise<Map<string, number>>;
}
