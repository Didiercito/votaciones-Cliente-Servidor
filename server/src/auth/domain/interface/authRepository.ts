import { AuthCredentialLogin,AuthCredentialRegister } from "../entities/authCredentials";

export interface AuthRepository {
    verifyUser(credentials: AuthCredentialLogin): Promise<AuthCredentialLogin | null>;
    registerUser(credentials: AuthCredentialRegister): Promise<AuthCredentialRegister | null>;
}
