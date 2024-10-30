import { Sequelize } from 'sequelize'

const PORT = Number(process.env.DATABASE_PORT)
const DB_NAME = process.env.DATABASE_NAME
const HOST = process.env.DATABASE_HOST
const USER = process.env.DATABASE_USER
const PASSWORD = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize({
    port: PORT,
    database: DB_NAME,
    dialect: 'mysql',
    host: HOST,
    username: USER,
    password: PASSWORD
});

function connectDb(){
    sequelize.authenticate()
    .then( ()=>console.log(`Connected with database`))
    .catch( (err) => {
        throw new Error("Don't connect with database: Error: " + err.message)
    })
}

export {
    sequelize,
    connectDb,
}