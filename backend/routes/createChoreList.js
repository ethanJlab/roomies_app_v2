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
    // url: http://localhost:3030/createChoreList
    // incoming: chore_list_name, chore_list_description, username, home_ID
    // outgoing: error, chore_list_name, chore_list_description, username, home_ID

    const { chore_list_name, chore_list_description, username, home_ID } = req.body;
    let error = 'success';
    let errorCode;

    // check if chores list name, username, and home_ID are not blank
    if (chore_list_name === '' || chore_list_name === null || chore_list_name === undefined || chore_list_name === ' ') {
        error = 'Chore list name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (username === '' || username === null || username === undefined || username === ' ') {
        error = 'Username cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (home_ID === '' || home_ID === null || home_ID === undefined || home_ID === ' ') {
        error = 'Home ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    // create chore list
    connection.query('INSERT INTO Chores_list (chore_list_name, chore_list_description, chore_list_creator, chore_list_ID, home_ID) VALUES (?, ?, (SELECT user_ID from Users WHERE username = ?), UUID(), ?)', [chore_list_name, chore_list_description, username, home_ID], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, chore_list_name, chore_list_description, username, home_ID });
        }
    });

});
module.exports = router;