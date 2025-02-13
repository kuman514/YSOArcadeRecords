import sql from 'better-sqlite3';

import KoishiPng from '^/public/temp/koishi.png';
import RasisWebp from '^/public/temp/rasis.webp';
import YuukaPng from '^/public/temp/yuuka.png';

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
  arcade_record_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  arcade_id TEXT NOT NULL,
  method_id TEXT NOT NULL,
  players INTEGER NOT NULL,
  player_side INTEGER NOT NULL,
  evaluation TEXT NOT NULL,
  stage TEXT NOT NULL,
  rank TEXT,
  comment TEXT NOT NULL,
  tag_ids TEXT NOT NULL,
  note TEXT,
  youtube_id TEXT,
  thumbnail_url TEXT NOT NULL,
  image_urls TEXT NOT NULL,
  achieved_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  modified_at TEXT NOT NULL
)`);

const isHaveArcadeRecordPosts =
  db
    .prepare<void[], { 'COUNT(*)': number }>('SELECT COUNT(*) FROM records')
    .get()!['COUNT(*)'] > 0;

if (!isHaveArcadeRecordPosts) {
  db.exec(`
    INSERT INTO records (arcade_record_id, title, author_id, arcade_id, method_id, players, player_side, evaluation, stage, rank, comment, tag_ids, note, youtube_id, thumbnail_url, image_urls, achieved_at, created_at, modified_at)
    VALUES
      ('dodonpachi-cshot--2025-01-22', '도돈파치(1997) 드디어 2-6 진출!', 1, 'dodonpachi-cshot', 'arcade-akatronics', 1, 1, '123456789', '2-6', null, '드디어 진출!', '["loop1-no-miss"]', '4미스', null, '${KoishiPng.src}', '["${KoishiPng.src}","${RasisWebp.src}","${YuukaPng.src}"]', '2025-01-22', '2025-01-23', '2025-01-24'),
      ('galagaarrangement--2025-01-22', '갤러그 어레인지먼트 130만점!', 1, 'galagaarrangement', 'arcade-akatronics', 1, 1, '1300000', 'ALL', 'YK24', '드디어 달성!', '["no-miss-all", "shop-record"]', '잔기 5개', null, '${RasisWebp.src}', '["${KoishiPng.src}","${RasisWebp.src}","${YuukaPng.src}"]', '2025-01-22', '2025-01-23', '2025-01-24');
  `);
}

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
