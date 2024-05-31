import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const secretKey: any = process.env.SECRET_JWT;

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Asumiendo que el token viene con el formato "Bearer <token>"

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        (req as any).userId = (decoded as any)._id;

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
}
