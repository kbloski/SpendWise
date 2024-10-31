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

// Upewnij się, że dodany jest eksport
export {};
