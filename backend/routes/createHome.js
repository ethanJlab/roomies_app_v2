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
    // url: http://localhost:3030/createHome
    // incoming: home_name, home_description, username
    // outgoing: error, home_name, home_description, username

    const { home_name, home_description, username } = req.body;
    let error = 'success';
    let errorCode;

    // create home
    if (home_name === '' || home_name === null || home_name === undefined || home_name === ' ') {
        error = 'Home name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    connection.query('INSERT INTO Homes (home_name, home_description, home_creator, home_ID) VALUES (?, ?, (SELECT user_ID from Users WHERE username = ?), UUID())', [home_name, home_description, username], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, home_name, home_description, username });
        }
    });

});

module.exports = router;