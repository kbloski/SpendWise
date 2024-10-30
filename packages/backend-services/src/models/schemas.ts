
export function syncDatabase(){
    try {
        console.log("Database Synchronization Success")
    } catch(err){
        console.error( err , "DataBase Synchronization Failed")
    }
}