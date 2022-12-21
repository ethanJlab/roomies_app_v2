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
    // url: http://localhost:3030/createShoppingList
    // incoming: list_name, username, home_ID
    // outgoing: error, list_name, username, home_ID

    const { list_name, username, home_ID } = req.body;
    let error = 'success';
    let errorCode;

    // check if shopping list name, username, and home_ID are not blank
    if (list_name === '' || list_name === null || list_name === undefined || list_name === ' ') {
        error = 'Shopping list name cannot be blank';
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

    // create shopping list
    connection.query('INSERT INTO Shopping_lists (list_name, list_creator, list_ID, home_ID) VALUES (?, (SELECT user_ID from Users WHERE username = ?), UUID(), ?)', [list_name, username, home_ID], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, list_name, username, home_ID });
        }
    });

});
module.exports = router;