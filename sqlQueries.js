//sql queries
//query to select a db
// delete a db named test
// DROP DATABASE test;
// create a db named roomies app
// CREATE DATABASE roomies_app;

//create users table with attributes firstname lastname email password username and userID
// CREATE TABLE users ( firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), username VARCHAR(255), userID INT NOT NULL, PRIMARY KEY (userID));
// alter users table name to Users
// ALTER TABLE users RENAME TO Users;
// make username and email unique in the users table
// ALTER TABLE Users ADD UNIQUE (username);

//delete table named test
// DROP TABLE test;

// create a table named Home with attributes home_name, home_description, home_ID, home_creator WITH home_ID as a varchar(255) and the primary key
// CREATE TABLE Home ( home_name VARCHAR(255), home_description VARCHAR(255), home_ID VARCHAR(255) not null, home_creator VARCHAR(255), PRIMARY KEY (home_ID));

// create a table named member_of with attributes home_ID, member_ID, with home_ID and member_ID as varchar(255) and the foreign keys referencing the Homes and Users tables
// CREATE TABLE member_of ( home_ID VARCHAR(255), member_ID VARCHAR(255), FOREIGN KEY (home_ID) REFERENCES Home(home_ID), FOREIGN KEY (member_ID) REFERENCES Users(userID));

// alter the attribute in member_of so that home_ID and member_ID are not null
// ALTER TABLE member_of ALTER COLUMN home_ID SET NOT NULL;

// create a table named Lists with attributes list_name, list_ID, list_creator, home_ID, with list_ID as a varchar(255) and the primary key and the foreign key referencing the Homes table
// CREATE TABLE Lists ( list_name VARCHAR(255), list_ID VARCHAR(255) not null, list_creator VARCHAR(255), home_ID VARCHAR(255), PRIMARY KEY (list_ID), FOREIGN KEY (home_ID) REFERENCES Home(home_ID));

//create a table named list_items with attributes item_name, list_ID that references the Lists table, obtained (tinyint)
// CREATE TABLE list_items ( item_name VARCHAR(255), list_ID VARCHAR(255), obtained TINYINT, FOREIGN KEY (list_ID) REFERENCES Lists(list_ID));
// rename table named Lists to Shopping_Lists
// ALTER TABLE Lists RENAME TO Shopping_Lists;
//rename table named list_items to shopping_List_Items
// ALTER TABLE shopping_List_Items RENAME TO shopping_list_items;

//create table expenses_list with attributes expense_list_name, expense_list_ID, expense_list_creator, home_ID, with expense_list_ID as a varchar(255) and the primary key and the foreign key home_ID referencing the Homes table
// CREATE TABLE expenses_list ( expense_list_name VARCHAR(255), expense_list_ID VARCHAR(255) not null, expense_list_creator VARCHAR(255), home_ID VARCHAR(255), PRIMARY KEY (expense_list_ID), FOREIGN KEY (home_ID) REFERENCES Home(home_ID));
//create table expenses with attribues expense_name, expense_list_ID, expense_creator, expense_amount, expense_due_date, expense_ID, with expense_ID as a varchar(255) and the primary key and the foreign key expense_list_ID referencing the expenses_list table
// CREATE TABLE expenses ( expense_name VARCHAR(255), expense_list_ID VARCHAR(255), expense_creator VARCHAR(255), expense_amount VARCHAR(255), expense_due_date VARCHAR(255), expense_ID VARCHAR(255) not null, PRIMARY KEY (expense_ID), FOREIGN KEY (expense_list_ID) REFERENCES expenses_list(expense_list_ID));

//create table chores_list with attributes chore_list_name, chore_list_description, chore_list_ID not null, chore_list_creator not null, home_ID not null, with chore_list_ID as a varchar(255) and the primary key and the foreign key home_ID referencing the Homes table
// CREATE TABLE chores_list ( chore_list_name VARCHAR(255), chore_list_description VARCHAR(255), chore_list_ID VARCHAR(255) not null, chore_list_creator VARCHAR(255), home_ID VARCHAR(255) not null, PRIMARY KEY (chore_list_ID), FOREIGN KEY (home_ID) REFERENCES Home(home_ID));

// create table chores with attributes chore_name, chore_list_ID not null, chore_creator not null, chore_due_date, chore_ID not null, with chore_ID as a varchar(255) and the primary key and the foreign key chore_list_ID referencing the chores_list table
// CREATE TABLE chores ( chore_name VARCHAR(255), chore_list_ID VARCHAR(255) not null, chore_creator VARCHAR(255), chore_due_date VARCHAR(255), chore_ID VARCHAR(255) not null, PRIMARY KEY (chore_ID), FOREIGN KEY (chore_list_ID) REFERENCES chores_list(chore_list_ID));

// create table Callander with attributes home_ID not null, event_ID not null
// CREATE TABLE Callander ( home_ID VARCHAR(255) not null, event_ID VARCHAR(255) not null, FOREIGN KEY (home_ID) REFERENCES Home(home_ID));
//alter table Callander to make the attribute event_ID a foreign key referencing the events table
// ALTER TABLE Callander ADD FOREIGN KEY (event_ID) REFERENCES events(eventID);

//create table named events with attributes eventID not null as the primary key, eventName, eventDescription, eventDate, eventTime, eventLocation, eventCreator, homeID not null, with the foreign key homeID referencing the Homes table
// CREATE TABLE events ( eventID VARCHAR(255) not null, eventName VARCHAR(255), eventDescription VARCHAR(255), eventDate VARCHAR(255), eventTime VARCHAR(255), eventLocation VARCHAR(255), eventCreator VARCHAR(255), homeID VARCHAR(255) not null, PRIMARY KEY (eventID), FOREIGN KEY (homeID) REFERENCES Home(homeID));

//create a table named Note_board with attributes note_board_ID, note_board_name, note_board_creator, home_ID, with note_board_ID as a varchar(255) and the primary key and the foreign key home_ID referencing the Homes table
// CREATE TABLE Note_board ( note_board_ID VARCHAR(255) not null, note_board_name VARCHAR(255), note_board_creator VARCHAR(255), home_ID VARCHAR(255) not null, PRIMARY KEY (note_board_ID), FOREIGN KEY (home_ID) REFERENCES Home(home_ID));
//create a table named notes with attributes note_ID not null, note_board_ID not null, note_creator, note_content, with note_ID as a varchar(255) and the primary key and the foreign key note_board_ID referencing the Note_board table
// CREATE TABLE notes ( note_ID VARCHAR(255) not null, note_board_ID VARCHAR(255) not null, note_creator VARCHAR(255), note_content VARCHAR(255), PRIMARY KEY (note_ID), FOREIGN KEY (note_board_ID) REFERENCES Note_board(note_board_ID));

// delete the homeID attribute from the events table
// ALTER TABLE events DROP COLUMN homeID;
// remove the foeign key homeID from the events table
// ALTER TABLE events DROP FOREIGN KEY events_ibfk_1;

// add a itemID and a completed (tinyint) attribute to the shopping_list_items table
// ALTER TABLE shopping_list_items ADD itemID VARCHAR(255) not null;

//change table name Callander to Calendar
// ALTER TABLE Callander RENAME TO Calendar;

// add a owed_expenses table with attributes user_ID, expense_ID, amountOwed
// CREATE TABLE owed_expenses ( user_ID VARCHAR(255), expense_ID VARCHAR(255), amountOwed VARCHAR(255));

// alter all attributes in events so that there is a _ between each word
// ALTER TABLE events CHANGE eventID event_ID VARCHAR(255) not null;
// ALTER TABLE events CHANGE eventName event_name VARCHAR(255);
// ALTER TABLE events CHANGE eventDescription event_description VARCHAR(255);
// ALTER TABLE events CHANGE eventDate event_date VARCHAR(255);
// ALTER TABLE events CHANGE eventTime event_time VARCHAR(255);
// ALTER TABLE events CHANGE eventLocation event_location VARCHAR(255);
// ALTER TABLE events CHANGE eventCreator event_creator VARCHAR(255);

//in the table owed_expenses add the foreiugn key user_ID referencing the users table and the foreign key expense_ID referencing the expenses table
// ALTER TABLE owed_expenses ADD FOREIGN KEY (user_ID) REFERENCES users(user_ID);
// ALTER TABLE owed_expenses ADD FOREIGN KEY (expense_ID) REFERENCES expenses(expense_ID);

//make homes_creator a foreign key referencing the users table
// ALTER TABLE Home ADD FOREIGN KEY (homes_creator) REFERENCES users(user_ID);

// change the attributes firstname and lastname in the users table to first_name and last_name
// ALTER TABLE users CHANGE firstname first_name VARCHAR(255);
// ALTER TABLE users CHANGE lastname last_name VARCHAR(255);

// set default value for the attribute home_ID in the users table to UUID()
// ALTER TABLE users CHANGE home_ID home_ID VARCHAR(255) DEFAULT UUID();

//alter the column name of member_ID in the member_of table to user_ID
// ALTER TABLE member_of CHANGE member_ID user_ID VARCHAR(255);
//delete all from the member_of table
// DELETE FROM member_of;

// make the list_creator column in the shopping_list table a foreign key referencing the Users table
// ALTER TABLE shopping_list ADD FOREIGN KEY (list_creator) REFERENCES Users(user_ID);
