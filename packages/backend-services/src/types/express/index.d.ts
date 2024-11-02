// src/types/express.d.ts
import { Request } from "express";
import UserType from "../UserType";

declare global {
    namespace Express {
        interface Request {
            user?: UserType; // Rozszerzenie interfejsu Request
        }
    }
}

export {};
