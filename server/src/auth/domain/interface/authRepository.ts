import { AuthCredentialRegister } from "../entities/authCredentialRegister";

export interface AuthRepository {
    verifyUser(credentials: AuthCredentialRegister): Promise<AuthCredentialRegister | null>;
    registerUser(credentials: AuthCredentialRegister): Promise<AuthCredentialRegister | null>;
}
