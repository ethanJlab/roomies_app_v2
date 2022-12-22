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
    // url: http://localhost:3030/addItemToShoppingList
    // incoming: item_name, list_ID, quantity
    // outgoing: error, item_name, list_ID, quantity

    var { item_name, list_ID, quantity } = req.body;

    let error = 'success';
    let errorCode;

    // check if item name is blank and list_ID is blank
    if (item_name === '' || item_name === null || item_name === undefined || item_name === ' ') {
        error = 'Item name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (list_ID === '' || list_ID === null || list_ID === undefined || list_ID === ' ') {
        error = 'List ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (quantity === '' || quantity === null || quantity === undefined || quantity === ' ') {
        quantity = 1;
    }

    connection.query('INSERT INTO shopping_list_items (item_name, list_ID, quantity, item_ID) VALUES (?, ?, ?, UUID())', [item_name, list_ID, quantity], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, item_name, list_ID, quantity });
        }
    });

});
module.exports = router;