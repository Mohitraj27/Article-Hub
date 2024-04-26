const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken')
require('dotenv').config();

var auth = require('../services/authentication');

router.post('/addNewAppUser', auth.authenticateToken, (req, res) => {
    let user = req.body;
    query = "select email,password,status from appuser where email=?";

    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into appuser(name,email,password,status,isDeletable) values(?,?,?,'false','true')";
                connection.query(query, [user.name, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully registerd" });

                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email Already Exist" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email, password, status, isDeletable from appuser where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incoorect Email or Password" });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Wait for Admin Approval" });
            }
            else if (results[0].password == user.password) {
                // respone -> payload of the JWT Token
                const respone = { email: results[0].email, isDeletable: results[0].isDeletable }
                /* accessToken -> headers.payload.verifysignature
                headers -> algo  & its type, payload -> useremail , deleetable -> false/true
                payload also contains issue date (iat) and exp date (exp) */
                const accessToken = jwt.sign(respone, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ messgae: "Something went wrong. Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

// using this route all users can be retrived except admin whose isDeletable = true
router.get('/getAllAppuser',auth.authenticateToken,(req,res)=>{
    const tokenPayload = res.locals;
    var query;
    if(tokenPayload.isDeletable === 'false'){
        query="select id,name,email,status from appuser where isDeletable='true'";
    }else{
        query="select id,name,email,status from appuser where isDeletable='true' and email !=?"
    }
    connection.query(query,[tokenPayload.email],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

// this route will update new user  status to true or false
router.post('/updateUserStatus',auth.authenticateToken,(req,res)=>{
    let user=req.body;
    var query= "update appuser set status=? where id=? and isDeletable='true'";

    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"User id doesn't exist"})
            }
            return res.status(200).json({message:"User Updated Successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
})

// Update the User name and email
router.post('/updateUser',auth.authenticateToken,(req,res)=>{
    let user=req.body;
    var query= "update appuser set name=?,email=? where id=?";

    connection.query(query,[user.name,user.email,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows ==0){
                return res.status(404).json({message:"User id doesn't exist"})
            }
            return res.status(200).json({message:"User Updated Successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
})

// this route checks whther token is stored in localstorage or it has been expired 
// based on the response it will allow user to route to the admin user
router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})
module.exports = router;