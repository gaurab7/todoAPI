import { DatabaseSync } from 'node:sqlite'

// Create an in-memory database
//Stored in RAM rather than on disk, all data is lost when the program stops or the system shuts down.
const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE user(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)
    `)
db.exec(`
    CREATE TABLE todos(id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER,task TEXT, state BOOLEAN DEFAULT 0, FOREIGN KEY(userid) REFERENCES user(id))
    `)

export default db//allows to import the db from elsewhere
        