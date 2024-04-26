require('dotenv').config()
const jwt= require('jsonwebtoken')


// middleware 
function authenticateToken(req,res,next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
    return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,response)=>{
        if(err)
        return res.sendStatus(403);
       // through this middleware we'll be getting resposne of token i.e whatever 
       // present inside payload it will be comes in response and stored to res.locals
        res.locals=response;
        next()
    })
}


module.exports={authenticateToken:authenticateToken}