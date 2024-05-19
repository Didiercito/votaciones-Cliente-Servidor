import { AuthUseCaseRegister, AuthCaseUseLogin } from "../application/use-cases/authUseCase";
import { AuthMongoDBAdapterRepository } from "./adapters/authMongoDBAdapter";
import { AuthController } from "./controllers/authController";

const authMongoDBAdapter = new AuthMongoDBAdapterRepository();
const authCaseUseLogin = new AuthCaseUseLogin(authMongoDBAdapter);
const authCaseUseRegister = new AuthUseCaseRegister(authMongoDBAdapter);
export const authController = new AuthController(authCaseUseRegister,authCaseUseLogin);