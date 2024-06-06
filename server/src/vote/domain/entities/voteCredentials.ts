import { IsNotEmpty } from "class-validator";

export class VoteCredentials {
    @IsNotEmpty()
    public userId: string;

    @IsNotEmpty()
    public candidateId: string;

    @IsNotEmpty()
    public totalVotes: number
    
    constructor(userId: string, candidateId: string, totalVotes: number) {
        this.userId = userId;
        this.candidateId = candidateId;
        this.totalVotes = totalVotes;
    }
}