import dotenv from 'dotenv'
dotenv.config();
import jwt from "jsonwebtoken";


const SecretKey:any = process.env.SECRET_JWT;

export const generateToken = async(data:any):Promise<any> =>{
    try {
        const token = jwt.sign(data, SecretKey,);
        return token;
    } catch (error) {
        console.error("Error al generar el token:", error);
        return null;
    }
}
