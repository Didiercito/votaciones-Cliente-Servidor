// import { AuthRepository } from "../../domain/interface/authRepository";
// import { AuthCredentialRegister } from "../../domain/entities/authCredentialRegister";
// import { AuthValidator } from "../../domain/validators/authValidartor";
// import { generateToken } from "../jwt/auth";


// export class AuthUseCaseRegister {

//     constructor(private readonly authRepository: AuthRepository) {}

//     async execute(CURP: string, password: string, name: string, lastname: string, email: string, state: string, city: string, zip_code: number): Promise<any | null> {
//         let credentials = new AuthCredentialRegister(
//             CURP,
//             password,
//             name,
//             lastname,
//             email,
//             state,
//             city,
//             zip_code
//         );

//         let authValidate = new AuthValidator(credentials);
//         await authValidate.invalidHasErrors();

//         const newUser = await this.authRepository.registerUser(credentials);

//         if (!newUser) {
//             this.invalidCredentialsThrow();
//         }

//         const token = await generateToken(newUser.CURP);
//         return {
//             newUser,
//             token
//         };
//     }

//     private invalidCredentialsThrow() {
//         throw ({
//             http_status: 401,
//             errors: [
//                 {
//                     property: "credentials",
//                     messages: [
//                         "Invalid credentials"
//                     ]
//                 }
//             ]
//         });
//     }
// }
