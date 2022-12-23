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
    // url: http://localhost:3030/createNoteBoard
    // incoming: home_ID, note_board_name,  username
    // outgoing: error, home_ID, note_board_name,  username

    const { home_ID, note_board_name,  username } = req.body;
    let error = 'success';
    let errorCode;

    // check if note board name is blank and if home_ID is blank
    if (note_board_name === '' || note_board_name === null || note_board_name === undefined || note_board_name === ' ') {
        error = 'Note board name cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }
    if (home_ID === '' || home_ID === null || home_ID === undefined || home_ID === ' ') {
        error = 'Home ID cannot be blank';
        errorCode = 409;
        return res.status(errorCode).json({ error });
    }

    //create note board with table named Note_board and getting note_board_creator from Users table using username
    connection.query('INSERT INTO Note_board (note_board_name,  note_board_creator, note_board_ID, home_ID) VALUES (?, (SELECT user_ID from Users WHERE username = ?), UUID(), ?);', [note_board_name,  username, home_ID], (err, results, fields) => {
        if (err) {
            error = err;
            errorCode = 409;
            return res.status(errorCode).json({ error });
        } else {
            return res.status(200).json({ error, home_ID, note_board_name,  username });
        }
    });

});
module.exports = router;

//example json
/*
{
    "home_ID": "test",
    "note_board_name": "test",
    "username": "Tarova"
}
*/