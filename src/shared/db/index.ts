import sql from 'better-sqlite3';

const db = sql('yso-arcade-records-local-temp.db');

/**
 * @desc
 * User(admin) database
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL
  );
`);

/**
 * @desc
 * User(admin)s' session database
 */
db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

/**
 * @todo
 * Add arcade record post database
 * Add review post database
 * Add gallery post database
 */

export default db;
