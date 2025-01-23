import db from './db';

export function createUser(email: string, password: string) {
  const result = db
    .prepare('INSERT INTO users (email, password, name) VALUES (?, ?)')
    .run(email, password);
  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  const result = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  return result;
}

export function getUserById(userId: string) {
  const result = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  return result;
}

export function changePasswordByEmail(email: string, password: string) {
  db.prepare('UPDATE users SET password = ? WHERE email = ?').run(
    password,
    email
  );
}

export function deleteUserById(userId: string) {
  db.prepare('DELETE FROM users WHERE id = ?').run(userId);
}
