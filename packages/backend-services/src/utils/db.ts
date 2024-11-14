import { Sequelize } from 'sequelize'

const PORT = Number(process.env.DATABASE_PORT)
const DB_NAME = process.env.DATABASE_NAME
const HOST = process.env.DATABASE_HOST
const USER = process.env.DATABASE_USER
const PASSWORD = process.env.DATABASE_PASSWORD

let sequelize = new Sequelize({
    port: PORT,
    database: DB_NAME,
    dialect: "mysql",
    host: HOST,
    username: USER,
    password: PASSWORD,
});


let timeIntervalCheckConnection = 10000;
let timeoutId: any = null;

function connectDb(){
    sequelize.authenticate()
    .then( ()=>console.log(`Connected with database`))
    .catch( (err) => {
        console.error("Don't connect with database: Error: " + err.message )
        if (!timeoutId) timeoutId = setTimeout( 
            () => {
                timeoutId = null;
                connectDb()
            },  timeIntervalCheckConnection )
    })
}

export {
    sequelize,
    connectDb,
}