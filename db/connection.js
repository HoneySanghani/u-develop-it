const mysql=require('mysql2');
//connection to the database
const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'election'
    },
    console.log('connection to the database')
);
module.exports=db;
