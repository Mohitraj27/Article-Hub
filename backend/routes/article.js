const express = require('express');
const connection = require('../connection');
const { request } = require('..');
const router = express.Router();
var auth = require('../services/authentication');

router.post('/addNewArticle',auth.authenticateToken,(req,res)=>{
    let article = req.body;
    var query= "insert into article (title,content,publication_date,categoryId,status) values(?,?,?,?,?)";
    connection.query(query,[article.title,article.content,new Date(),article.categoryId,article.status],(err,results)=>{
        if(!err){
         return res.status(200).json({message:"Article Added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getAllArticle',auth.authenticateToken,(req,res)=>{
   var query = "select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId ,c.name as categoryName from article as a inner join category as c where a.categoryId=c.id";
   
   connection.query(query,(err,results)=>{
    if(!err){
        return res.status(200).json(results);
    }
    else{
        return res.status(500).json(err);
    }
   })

})


router.get('/getAllPublishedArticle',auth.authenticateToken,(req,res)=>{
    var query = "select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId ,c.name as categoryName from article as a inner join category as c where a.categoryId=c.id and a.status='published'";
    
    connection.query(query,(err,results)=>{
     if(!err){
         return res.status(200).json(results);
     }
     else{
         return res.status(500).json(err);
     }
    })
 
 })

 router.post('/updateArticle',auth.authenticateToken,(req,res)=>{
    let article = req.body;
    var query= "update article set title=?, content=?,categoryId=?,publication_date=?,status=? where id=?";
    connection.query(query,[article.title,article.content,article.categoryId,new Date(),article.status,
    article.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Article id doesn't Found"});

            }
            return res.status(200).json({message:"Article Updated Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
 })



 router.get('/deleteArticle/:id',auth.authenticateToken,(req,res)=>{
    const id = req.params;
    var query= "delete from article where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Article id doesn't Found"});

            }
            return res.status(200).json({message:"Article Deleted Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
 })
module.exports = router;