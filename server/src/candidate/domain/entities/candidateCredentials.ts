import { IsNotEmpty } from "class-validator";

export class CandidateCredentials {
    public _id?: string;

    @IsNotEmpty()
    public image_url: string;

    @IsNotEmpty()
    public name_candidate: string;

    @IsNotEmpty()
    public name_political_party: string;

    @IsNotEmpty()
    public id_political_party: string;

    @IsNotEmpty()
    public candidate_id: string;
    

    constructor(image_url: string, name_candidate: string, name_political_party: string, id_political_party: string, candidate_id: string) {
        this.image_url = image_url;
        this.name_candidate = name_candidate;
        this.name_political_party = name_political_party;
        this.id_political_party = id_political_party;
        this.candidate_id = candidate_id;
    }
}
