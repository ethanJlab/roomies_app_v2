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
    // url: http://localhost:3030/addNoteToBoard
    // incoming: note_board_ID, note_content, username
    // outgoing: error, note_board_ID, note_content, username

    const { note_board_ID, note_content, username } = req.body;
    let error = 'success';
    let errorCode;

    //check if note_board_ID is blank and if username is blank
    if (note_board_ID === '' || note_board_ID === null || note_board_ID === undefined || note_board_ID === ' ') {
        error = 'Note board ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (username === '' || username === null || username === undefined || username === ' ') {
        error = 'Username cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    //create a note
    connection.query('INSERT INTO notes (note_content, note_creator, note_ID, note_board_ID) VALUES (?, (SELECT user_ID from Users WHERE username = ?), UUID(), ?);', [note_content, username, note_board_ID], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, note_board_ID, note_content, username });
        }
    });

});
module.exports = router;

//example json
/*
{
    "note_board_ID": "test",
    "note_content": "test",
    "username": "Tarova"
}
*/