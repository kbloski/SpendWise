import app from './app';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'})

const PORT = process.env.BACKEND_PORT || 8080;

// syncDatabase
// registerRoutes

app.get('/', (req, res) => {
    res.json("Server working!")
})

app.listen(PORT, ()=>{
    console.log(`Server has been starting at port ${PORT}`)
})