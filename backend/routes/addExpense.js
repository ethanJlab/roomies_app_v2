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
    // url: http://localhost:3030/addExpense
    // incoming: expense_name, expense_list_ID, expense_amount, username, expense_due_date,expense_amount_paid,
    // outgoing: error, expense_name, expense_list_ID, expense_amount, username, expense_due_date,expense_amount_paid, expense_ID

    const { expense_name, expense_list_ID, expense_amount, username, expense_due_date, expense_amount_paid } = req.body;
    let error = 'success';
    let errorCode;

    // check if expense name is blank and expense_list_ID is blank
    if (expense_name === '' || expense_name === null || expense_name === undefined || expense_name === ' ') {
        error = 'Expense name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (expense_list_ID === '' || expense_list_ID === null || expense_list_ID === undefined || expense_list_ID === ' ') {
        error = 'Expense list ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    // create expense
    connection.query('INSERT INTO expenses (expense_name, expense_list_ID, expense_amount, expense_creator, expense_due_date, expense_amount_paid, expense_ID) VALUES (?, ?, ?, (SELECT user_ID from Users WHERE username = ?), ?, ?, UUID())', [expense_name, expense_list_ID, expense_amount, username, expense_due_date, expense_amount_paid], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, expense_name, expense_list_ID, expense_amount, username, expense_due_date, expense_amount_paid });
        }
    });

});
module.exports = router;

// generate a json for the expense list

/*
{
    "expense_name": "Electricity",
    "expense_list_ID": "ab67954a-8239-11ed-9e92-62bd4a1ad21b",
    "expense_amount": 100,
    "username":"Tarova",
    "expense_due_date": "2021-08-01",
    "expense_amount_paid": 0
}

*/