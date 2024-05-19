import { Request, Response } from "express";
import { AuthUseCaseRegister, AuthCaseUseLogin } from '../../application/use-cases/authUseCase';

export class AuthController {
    constructor(
        readonly authCaseRegister: AuthUseCaseRegister,
        readonly authCaseLogin: AuthCaseUseLogin
    ) {}

    async signup(req: Request, res: Response) {
        try {
            const { CURP, password, name, lastname, email, state, city, zip_code } = req.body;
            const user = await this.authCaseRegister.execute(CURP, password, name, lastname, email, state, city, zip_code);
            res.status(200).json({
                message: "User registered successfully",
                success: true,
                user
            });
        } catch (error:any) {
            console.error(error);
            res.status(error.http_status ?? 500).json({
                message: "Internal Server Error. Please try again later",
                success: false,
                error: error
            });
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { CURP, password } = req.body;
            const { user, token } = await this.authCaseLogin.execute(CURP, password);

            res.status(200).json({
                message: "Login successful",
                success: true,
                user,
                token
            });
        } catch (error:any) {
            console.error(error);
            res.status(error.http_status ?? 401).json({
                message: "Error during authentication. Please verify your credentials and try again",
                success: false,
                error: error
            });
        }
    }
}