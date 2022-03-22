const mysql=require('mysql2');
//connection to the database
const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'H@ney1998',
        database:'election'
    },
    console.log('connection to the database')
);
module.exports=db;