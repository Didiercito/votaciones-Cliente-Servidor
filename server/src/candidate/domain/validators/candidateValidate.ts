import { validate } from "class-validator";
import { CandidateCredentials } from "../entities/candidateCredentials";

export class candidateValidator {
    public credentials: CandidateCredentials; 
    public listErrors: any []


    constructor(credentials:CandidateCredentials){
        this.credentials = credentials
        this.listErrors =[]
    }


    public async invalidHasErrors() {
        await this.validate();

        if (!this.foundedErrors()) {
            return;
        }

        throw {
            http_status: 422,
            validations: this.errors()
        };
    }

    protected async validate() {
        this.listErrors = await validate(this.credentials);
    }

    protected errors(): any[] {
        return this.listErrors.map((error) => {
            let property = error.property;
            let errorMessages = Object.values(error.constraints);
            return {
                property,
                errorMessages
            };
        });
    }

    protected foundedErrors(): boolean {
        return this.listErrors.length > 0;
    }
}
