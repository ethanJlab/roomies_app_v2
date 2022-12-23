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
    // url: http://localhost:3030/createEvent
    // incoming: event_name, event_description, event_date, event_location, username, calendar_ID, event_time
    // outgoing: error, event_name, event_description, event_date, event_location, username, calendar_ID, event_time

    const { event_name, event_description, event_date, event_location, username, calendar_ID,event_time } = req.body;
    let error = 'success';
    let errorCode;

    // check if event_name is blank, username, and calendar_ID
    if (event_name === '' || event_name === null || event_name === undefined || event_name === ' ') {
        error = 'Event name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (username === '' || username === null || username === undefined || username === ' ') {
        error = 'Username cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (calendar_ID === '' || calendar_ID === null || calendar_ID === undefined || calendar_ID === ' ') {
        error = 'Calendar ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    // create event
    connection.query('INSERT INTO events (event_name, event_description, event_date, event_location, event_creator, event_ID, calendar_ID, event_time) VALUES (?, ?, ?, ?, (SELECT user_ID from Users WHERE username = ?), UUID(), ?,?);', [event_name, event_description, event_date, event_location, username, calendar_ID,event_time], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, event_name, event_description, event_date, event_location, username, calendar_ID, event_time });
        }
    });

});
module.exports = router;

// json for example request
/*
{
    "event_name": "test",
    "event_description": "test",
    "event_date": "2020-12-12",
    "event_location": "test",
    "username": "Tarova",
    "calendar_ID": "257e1a9f-82ee-11ed-9e92-62bd4a1ad21b"
}
*/