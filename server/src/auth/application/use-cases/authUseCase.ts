import { AuthCredential } from "../../domain/entities/authCredential";
import { AuthRepository } from "../../domain/interface/authRepository";
import { AuthValidator } from "../../domain/validators/authValidartor";
import { generateToken } from "../jwt/auth";

export class AuthCase {
 
    constructor(readonly authRepository:AuthRepository){}

    async execute(CURP:string, password:string, name:string, lastname:string, email:string, state:string, city:string, zip_code:number):Promise<any|null>{
        let credentials = new AuthCredential(CURP,password,name,lastname,email,state,city,zip_code);
        let authValidate = new AuthValidator(credentials);

        await authValidate.invalidHasErros();

        let user = await this.authRepository.verfiyUser(credentials)

        if(!user){
            this.invalidCredentialsTrhow();
        }

        let token = generateToken(user?.CURP)

        return {
            user,
            token
        }
    }

    private invalidCredentialsTrhow() {
        throw ({
            http_status: 401,
            errors: [
                {
                    property: "credentials",
                    messages: [
                        "Invalid credentials"
                    ]
                }
            ]
        });
    }

}