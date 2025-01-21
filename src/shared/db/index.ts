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
 * @desc
 * Arcade record post database
 */
db.exec(`CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY,
  arcadeRecordId TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  authorId INTEGER NOT NULL,
  arcadeId TEXT NOT NULL,
  methodId TEXT NOT NULL,
  players INTEGER NOT NULL,
  playerSide INTEGER NOT NULL,
  evaluation TEXT NOT NULL,
  stage TEXT NOT NULL,
  comment TEXT NOT NULL,
  tagIds TEXT NOT NULL,
  note TEXT,
  youTubeId TEXT,
  thumbnailUrl TEXT NOT NULL,
  imageUrls TEXT NOT NULL,
  achievedAt TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  modifiedAt TEXT NOT NULL,
  FOREIGN KEY (authorId) REFERENCES users(id)
)`);

/**
 * @desc
 * Review post database
 *
 * @todo
 * Finish creating table about review posts
 */
// db.exec(`CREATE TABLE IF NOT EXISTS reviews (
// )`);

/**
 * @desc
 * Gallery post database
 *
 * @todo
 * Finish creating table about gallery posts
 */
// db.exec(`CREATE TABLE IF NOT EXISTS gallery (
// )`);

export default db;
