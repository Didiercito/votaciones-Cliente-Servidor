import { AuthCredentialRegister } from "../../domain/entities/authCredentials";
import { AuthCredentialLogin } from "../../domain/entities/authCredentials";
import { AuthRepository } from "../../domain/interface/authRepository";
import { AuthValidator } from "../../domain/validators/authValidate";
import { generateToken } from "../jwt/auth";

export class AuthCaseUseLogin {
    constructor(readonly authRepository: AuthRepository) { }

    async execute(CURP: string, password: string) {
        const credentials = new AuthCredentialLogin(CURP, password);

        const authValidate = new AuthValidator(credentials);
        await authValidate.invalidHasErrors();

        const user = await this.authRepository.verifyUser(credentials);

        if (!user) {
            this.invalidCredentialsThrow();
        }

        const token = await generateToken(user?.CURP);

        return {
            user,
            token
        };
    }

    private invalidCredentialsThrow() {
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



export class AuthUseCaseRegister{
    constructor(readonly authRepository:AuthRepository){}
    
    
    async execute(CURP:string, password:string, name:string, lastname:string, email:string, state:string, city:string, zip_code:number){
        const credentials = new AuthCredentialRegister(
            CURP,
            password,
            name,
            lastname,
            email,
            state,
            city,
            zip_code
        );

        const authValidate = new AuthValidator(credentials);
        await authValidate.invalidHasErrors();

        const user = await this.authRepository.registerUser(credentials);

        if(!user){
            this.invalidCredentialsTrhow()
        }


        return user   
    }


    private invalidCredentialsTrhow(){
        throw({
            http_status: 401,
            errors: [
                {
                    property: "credentials",
                    message: [
                        "Invalid credentials"
                    ]
                }
            ]
        })
    }
}
