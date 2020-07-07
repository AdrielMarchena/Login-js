const { resolve } = require("path");
const mysql = require("mysql");
const res = require('dotenv').config({ path: resolve(__dirname,"../../.env") });
if(res.error){
    console.log(res.error);
}

console.log(process.env.DATABASE_HOST)

let DbInfo = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSW,
    database: process.env.DATABASE
}

const db = mysql.createConnection(DbInfo);

const connection = ()=>{db.connect( (error)=>{ 
    if(error){
        console.log(error);
        return;
    }
    console.log(`Connected to ${DbInfo.host} on database ${DbInfo.database}`);        
 })};

 module.exports = {connection , db};