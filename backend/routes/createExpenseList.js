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
    // url: http://localhost:3030/createExpenseList
    // incoming: expense_list_name, home_ID, username
    // outgoing: error, expense_list_name, home_ID, username, expense_list_ID

    const { expense_list_name, home_ID, username } = req.body;
    let error = 'success';
    let errorCode;

    // create expense list
    connection.query('INSERT INTO Expenses_list (expense_list_name, home_ID, expense_list_creator, expense_list_ID) VALUES (?, ?, (SELECT user_ID from Users WHERE username = ?), UUID())', [expense_list_name, home_ID, username], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, expense_list_name, home_ID, username });
        }
    });

});
module.exports = router;