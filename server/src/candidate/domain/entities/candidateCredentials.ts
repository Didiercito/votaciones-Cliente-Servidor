import { IsNotEmpty } from "class-validator";

export class CandidateCredentials {
    public _id?: string;

    @IsNotEmpty()
    public image_url: string;

    @IsNotEmpty()
    public name_candidate: string;

    constructor(image_url: string, name_candidate: string) {
        this.image_url = image_url;
        this.name_candidate = name_candidate;
    }
}
