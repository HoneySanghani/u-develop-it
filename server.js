const express=require('express');
const mysql=require('mysql2');
const PORT = process.env.PORT || 3001;
const app=express();
const inputCheck=require('./utils/inputCheck');
//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
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
//get all candidates
app.get('/api/candidates',(req,res)=>{
    const sql=`SELECT * FROM candidates`;
    db.query(sql,(err,rows)=>{
        if(err){
            res.send(500).json({error:err.message});
            return;
        }
        res.json({
            message:"success",
            data:rows
        });
    });
});
//get single candidate
app.get('/api/candidate/:id',(req,res)=>{
    const sql=`SELECT * FROM candidates WHERE id=?`;
    const params=[req.params.id];
    db.query(sql,params,(err,row)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:"sucess",
            data:row
        });
    });
});
//delete candidate
app.delete('/api/candidate/:id',(req,res)=>{
    const sql=`DELETE FROM candidates WHERE id=?`;
    const params=[req.params.id];
    db.query(sql,params,(err,result)=>{
        if(err){
            res.statusMessage(400).json({error:res.message});
        }else if(!result.affectedRows){
            res.json({
                message:'candidate not found'
            });
        }else{
            res.json({
                message:'deleted',
                changes:result.affectedRows,
                id:req.params.id
            });
        }
    });
});
//create a candidate
app.post('/api/candidate',({body},res)=>{
    const errors=inputCheck(body,'first_name','last_name','industry_connected');
    if(errors){
        res.status(400).json({error:errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
        message: 'success',
        data: body
        });
    });
})
// response for any other request which is not found
app.use((req,res)=>{
    res.status(404).end();
});
app.listen(PORT,()=>{
    console.log(`Server now running on the port ${PORT}`);
})