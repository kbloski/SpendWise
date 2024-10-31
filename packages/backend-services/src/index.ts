import dotenv from 'dotenv'; // musi być ładowany przed wszystkimi importami 
dotenv.config({path: '../../.env'})


import app from './app';


import registerRoutes from './routes';
import { syncDb } from './models/schemas';
import { connectDb } from './utils/db';

const PORT = process.env.BACKEND_PORT || 8080;

registerRoutes( app )
connectDb()
syncDb()

app.get('/', (req, res) => {
    res.json("Server working!")
})

app.listen(PORT, ()=>{
    console.log(`Server has been starting at port ${PORT}`)
})