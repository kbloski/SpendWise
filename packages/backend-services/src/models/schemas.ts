import User from "./UserModel"
import Report from "./ReportModel"
import { sequelize } from "../utils/db"

// Tabela budget_shares
// id: unikalny identyfikator współdzielenia budżetu
// budget_id: identyfikator budżetu
// user_id: identyfikator użytkownika, który ma dostęp do budżetu
// role: rola użytkownika w budżecie (np. admin, edytor)

// Opis relacji
// users może mieć wiele budgets.
// budgets mogą mieć wiele categories.
// categories mogą mieć wiele expenses.
// budgets mogą być współdzielone z wieloma users przez tabelę budget_shares.
// budgets mogą mieć wiele reports.

export async function syncDb(){
    try {
        await sequelize.sync()
        console.log("Database Synchronization Success")
    } catch(err){
        console.error( err , "DataBase Synchronization Failed")
    }
}

export {
    User,
    Report
}