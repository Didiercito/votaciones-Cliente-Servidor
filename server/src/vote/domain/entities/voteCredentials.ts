import { IsNotEmpty } from "class-validator";

export class VoteCredentials {
    @IsNotEmpty()
    public userId: string;

    @IsNotEmpty()
    public candidateId: string;

    constructor(userId: string, candidateId: string) {
        this.userId = userId;
        this.candidateId = candidateId;
    }
}