// import { AuthRepository } from "../../domain/interface/authRepository";
// import { AuthCredentialRegister } from "../../domain/entities/authCredentialRegister";
// import { AuthValidator } from "../../domain/validators/authValidartor";
// import { generateToken } from "../jwt/auth";

// export class AuthUseCaseLogin {

//     constructor(private readonly authRepository: AuthRepository) {}

//     async execute(CURP: string, password: string): Promise<any | null> {
//         let credentials = new AuthCredentialRegister(
//             CURP,
//             password,
//             "",  // Empty string for name
//             "",  // Empty string for lastname
//             "",  // Empty string for email
//             "",  // Empty string for state
//             "",  // Empty string for city
//             0    // 0 for zip_code
//         );

//         let authValidate = new AuthValidator(credentials);
//         await authValidate.invalidHasErrors();

//         const user = await this.authRepository.verifyUser(credentials);

//         if (!user) {
//             this.invalidCredentialsThrow();
//         }

//         const token = await generateToken(user.CURP);
//         return {
//             user,
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
