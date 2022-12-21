const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '161.35.126.112',
    user: 'universal',
    password: 'password',
    database: 'roomies_app'
});

router.post('/', async (req, res) => {
    // url: http://localhost:3030/addUserToHome
    // incoming: home_ID, username
    // outgoing: error, home_ID, username

    const { home_ID, username } = req.body;
    let error = 'success';
    let errorCode;

    // check if home_ID and username are not blank
    if (home_ID === '' || home_ID === null || home_ID === undefined || home_ID === ' ') {
        error = 'Home ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (username === '' || username === null || username === undefined || username === ' ') {
        error = 'Username cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    // add user to home
    connection.query('INSERT INTO member_of (home_ID, user_ID) VALUES (?, (SELECT user_ID from Users WHERE username = ?))', [home_ID, username], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, home_ID, username });
        }
    });

});
module.exports = router;