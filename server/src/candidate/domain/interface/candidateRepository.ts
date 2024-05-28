import { CandidateCredentials } from "../entities/candidateCredentials";

export interface CandidateRepository {
    createCandidate(credentials: CandidateCredentials): Promise<CandidateCredentials | null>;
    updateCandidate(_id: string, credentials: CandidateCredentials): Promise<CandidateCredentials | null>;
    deleteCandidate(_id: string): Promise<CandidateCredentials | null>;
    getAllCandidates(): Promise<CandidateCredentials[] | null>;
}
