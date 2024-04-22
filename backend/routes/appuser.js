const express=require('express');
const connection=require('../connection');
const router = express.Router();

router.post('/addNewAppUser',(req,res)=>{
    let user=req.body;
    query= "select email,password,status from appuser where email=?";
    
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0){
                query="insert into appuser(name,email,password,status,isDeletable) values(?,?,?,'false','true')";
                connection.query(query,[user.name,user.email,user.password],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Successfully registerd"});

                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message:"Email Already Exist"})
            }
        }
               else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;