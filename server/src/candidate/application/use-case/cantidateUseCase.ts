import { CandidateCredentials } from "../../domain/entities/candidateCredentials";
import { CandidateRepository } from "../../domain/interface/candidateRepository";
import { validate } from 'class-validator';

export class CreateCandidateUseCase {
    constructor(readonly candidateRepository: CandidateRepository) { }

    async execute(image_url: string, name_candidate: string, name_political_party: string, id_political_party: string, candidate_id: string, votes:number) {
        const credentials = new CandidateCredentials(image_url, name_candidate, name_political_party, id_political_party, candidate_id,votes);

        await this.validateCredentials(credentials);

        const candidate = await this.candidateRepository.createCandidate(credentials);

        if (!candidate) {
            this.throwInvalidCredentialsError();
        }

        return candidate;
    }

    private async validateCredentials(credentials: CandidateCredentials) {
        const errors = await validate(credentials);
        if (errors.length > 0) {
            throw {
                http_status: 400,
                errors: errors.map(error => ({
                    property: error.property,
                    message: Object.values(error.constraints || {})
                }))
            };
        }
    }

    private throwInvalidCredentialsError() {
        throw {
            http_status: 401,
            errors: [
                {
                    property: "credentials",
                    message: [
                        "Invalid credentials"
                    ]
                }
            ]
        };
    }
}

export class UpdateCandidateUseCase {
    constructor(readonly candidateRepository: CandidateRepository) { }

    async execute(_id: string, credentials: CandidateCredentials) {
        await this.validateCredentials(credentials);

        const updatedCandidate = await this.candidateRepository.updateCandidate(_id, credentials);

        if (!updatedCandidate) {
            this.throwCandidateNotFoundError();
        }

        return updatedCandidate;
    }

    private async validateCredentials(credentials: CandidateCredentials) {
        const errors = await validate(credentials);
        if (errors.length > 0) {
            throw {
                http_status: 400,
                errors: errors.map(error => ({
                    property: error.property,
                    message: Object.values(error.constraints || {})
                }))
            };
        }
    }

    private throwCandidateNotFoundError() {
        throw {
            http_status: 404,
            errors: [
                {
                    property: "candidate",
                    message: [
                        "Candidate not found"
                    ]
                }
            ]
        };
    }
}

export class DeleteCandidateUseCase {
    constructor(readonly candidateRepository: CandidateRepository) { }

    async execute(_id: string) {
        const deletedCandidate = await this.candidateRepository.deleteCandidate(_id);

        if (!deletedCandidate) {
            this.throwCandidateNotFoundError();
        }

        return deletedCandidate;
    }

    private throwCandidateNotFoundError() {
        throw {
            http_status: 404,
            errors: [
                {
                    property: "candidate",
                    message: [
                        "Candidate not found"
                    ]
                }
            ]
        };
    }
}

export class GetAllCandidatesUseCase {
    constructor(readonly candidateRepository: CandidateRepository) { }

    async execute(): Promise<CandidateCredentials[] | null> {
        try {
            const candidates = await this.candidateRepository.getAllCandidates();
            return candidates;
        } catch (error) {
            console.error("Error fetching candidates:", error);
            return null;
        }
    }
}
