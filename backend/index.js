var createError = require('http-errors');
var express = require('express'); 
var path = require('path');
var cors = require('cors');

var createUserRouter = require('./routes/createUser');
var createHomeRouter = require('./routes/createHome');
var createChoreListRouter = require('./routes/createChoreList');
var createChoreRouter = require('./routes/createChore');
var createShoppingListRouter = require('./routes/createShoppingList');
var addUserToHomeRouter = require('./routes/addUserToHome');
var createShoppingListItemRouter = require('./routes/createShoppingListItem');
var createExpenseListRouter = require('./routes/createExpenseList');
var addExpenseRouter = require('./routes/addExpense');
var createNoteBoardRouter = require('./routes/createNoteBoard');
var addNoteToBoardRouter = require('./routes/addNoteToBoard');
var createEventRouter = require('./routes/createEvent');


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
app.use('/createShoppingList', createShoppingListRouter);
app.use('/addUserToHome', addUserToHomeRouter);
app.use('/addItemToShoppingList', createShoppingListItemRouter);
app.use('/createExpenseList', createExpenseListRouter);
app.use('/addExpense', addExpenseRouter);
app.use('/createNoteBoard', createNoteBoardRouter);
app.use('/addNoteToBoard', addNoteToBoardRouter);
app.use('/createEvent', createEventRouter);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


module.exports = app;
