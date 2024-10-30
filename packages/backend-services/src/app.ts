import express, { RequestHandler } from 'express';
import cors from 'cors'
import authTokenMiddleware from './middlewares/authToken';

const app = express();

app.use(
    cors({
        origin: (origin, callback) =>{
            const allowedOrigins = process.env.ALLOWED_ORIGINS?.replace(' ','').split(',');
            if ( origin && origin === process.env.FRONTEND_URL) return callback(null, true)
            if ( allowedOrigins?.includes('*') ) return callback(null, true)
            return callback(new Error("Not allowed by cors"), false)
        },
        methods: ["GET", "POST", "PATCH","DELETE"],
        allowedHeaders: ['Content-Type', "authorization"]
    })
)

app.use( express.urlencoded());
app.use( express.json() );
app.use( express.static('./public') )
app.use( authTokenMiddleware as RequestHandler )

export default app;  