// src/types/express.d.ts
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any; // Rozszerzenie interfejsu Request
        }
    }
}

// Upewnij się, że dodany jest eksport
export {};
