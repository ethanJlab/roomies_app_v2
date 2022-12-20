const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const CryptoJS = require("crypto-js");

const connection = mysql.createConnection({
    host: '161.35.126.112',
    user: 'universal',
    password: 'password',
    database: 'roomies_app'
});

router.post('/', async (req, res) => {
    // url: http://localhost:3030/createUser
    // incoming: username, password, email, first_name, last_name
    // outgoing: error, email, first_name, last_name, username

    const { username, password, email, first_name, last_name } = req.body;
    let error = 'success';
    let errorCode;

    

    // create user
    if (formChecks(username, password, email, first_name, last_name, error, errorCode)) {
        const encryptedPassword = CryptoJS.SHA256(password).toString();
        connection.query(`INSERT INTO Users (username, password, email, first_name, last_name, user_ID) VALUES ('${username}', '${encryptedPassword}', '${email}', '${first_name}', '${last_name}', uuid());`, function(err){
            if (err) {
                error = err;
                errorCode = 500;
                return res.status(errorCode).json({ error, email, first_name, last_name, username });
            }        
            return res.status(200).json({ error, email, first_name, last_name, username });   
        });    
    }else{
        return res.status(errorCode).json({ error, email, first_name, last_name, username });
    }
                    
    })

    // function return true if all checks pass, false if any check fails
    function formChecks(username, password, email, first_name, last_name, error, errorCode) {
        // check if username is taken
        connection.query(`SELECT * FROM Users WHERE username = '${username}';`, function(result){            
        
            if (result != null) {
                error = 'Username is taken';
                errorCode = 409;
                res.status(errorCode).json({ error, email, first_name, last_name, username });
                return false;
            }        
            
        });

        // check if email is taken
        connection.query(`SELECT * FROM Users WHERE email = '${email}';`, function(result){            
        
            if (result != null) {
                error = 'Email is taken';
                errorCode = 409;
                res.status(errorCode).json({ error, email, first_name, last_name, username });
                return false;
            }        
            
        });

        // check if email is valid via regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            error = 'Invalid email';
            errorCode = 400;
            res.status(errorCode).json({ error, email, first_name, last_name, username });
            return false;
        }

        // check if password is valid
        // password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter,and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            error = 'Invalid password';
            errorCode = 400;
            res.status(errorCode).json({ error, email, first_name, last_name, username });
            return false;
        }
        return true;
    }

module.exports = router;