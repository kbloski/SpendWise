import app from './app';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'})
import registerRoutes from './routes';
import { syncDb } from './models/schemas';
import { connectDb } from './utils/db';
import { createWebToken, decodedToken } from './services/jwtManget';

const PORT = process.env.BACKEND_PORT || 8080;

// syncDatabase
registerRoutes( app )
connectDb()
syncDb()

app.get('/', (req, res) => {
    res.json("Server working!")
})

app.listen(PORT, ()=>{
    console.log(`Server has been starting at port ${PORT}`)
})