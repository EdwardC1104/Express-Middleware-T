import sqlite3 from 'sqlite3';

sqlite3.verbose();
const db = new sqlite3.Database('src/databases/database.db');

db.run(
    'CREATE TABLE IF NOT EXISTS users (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    username TEXT NOT NULL,\
    email TEXT NOT NULL,\
    passwordSalt TEXT NOT NULL,\
    passwordHash TEXT NOT NULL\
  )',
);

export { db };
