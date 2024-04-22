const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken')
require('dotenv').config();
router.post('/addNewAppUser', (req, res) => {
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
module.exports = router;