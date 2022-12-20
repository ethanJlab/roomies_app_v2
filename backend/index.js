var createError = require('http-errors');
var express = require('express'); 
var path = require('path');
var cors = require('cors');

var createUserRouter = require('./routes/createUser');
var createHomeRouter = require('./routes/createHome');
var createChoreListRouter = require('./routes/createChoreList');
var createChoreRouter = require('./routes/createChore');


var app = express();
var port = 3030;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/createUser', createUserRouter);
app.use('/createHome', createHomeRouter);
app.use('/createChoreList', createChoreListRouter);
app.use('/createChore', createChoreRouter);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


module.exports = app;
