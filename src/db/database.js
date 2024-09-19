const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database
const dbPath = path.resolve(__dirname, 'cs_mentor.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create a table for users if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    progress TEXT DEFAULT '{}'
  )
`);

module.exports = db;
