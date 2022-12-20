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
    // url: http://localhost:3030/createChore
    // incoming: chore_name, chore_list_ID, username,
    // outgoing: error, chore_name, chore_list_ID, username, chore_ID,

    const { chore_name, chore_list_ID, username, } = req.body;

    let error = 'success';
    let errorCode;

    // check if chore name, chore list ID, username, and are not blank
    if (chore_name === '' || chore_name === null || chore_name === undefined || chore_name === ' ') {
        error = 'Chore name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (chore_list_ID === '' || chore_list_ID === null || chore_list_ID === undefined || chore_list_ID === ' ') {
        error = 'Chore list ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (username === '' || username === null || username === undefined || username === ' ') {
        error = 'Username cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    // create chore
    connection.query('INSERT INTO chores (chore_name, chore_list_ID, chore_creator, chore_ID) VALUES (?, ?, (SELECT user_ID from Users WHERE username = ?), UUID())', [chore_name, chore_list_ID, username], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            // get the just created chore_ID
            connection.query('SELECT chore_ID FROM chores WHERE chore_name = ? AND chore_list_ID = ? AND chore_creator = (SELECT user_ID from Users WHERE username = ?)', [chore_name, chore_list_ID, username], (err, results, fields) => {
                if (err) {
                    error = err;
                    errorCode = 409;
                    return res.status(errorCode).json({ error });
                } else { 
                    return res.status(200).json({ error, chore_name, chore_list_ID, username, chore_ID: results});
                }
            });
        }
    });

});

module.exports = router;