import { AuthCredential } from "../entities/authCredential";

export interface AuthRepository{
    verfiyUser(credentials:AuthCredential):Promise<AuthCredential|null>;
}