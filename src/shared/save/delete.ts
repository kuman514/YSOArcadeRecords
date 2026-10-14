'use client';

import { OBJECT_STORE_NAME } from './constants';

export function delteFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export async function deleteFromIndexedDatabase(
  key: string,
  database: IDBDatabase
) {
  const objectStore = database
    .transaction(OBJECT_STORE_NAME, 'readwrite')
    .objectStore(OBJECT_STORE_NAME);

  if (!objectStore) {
    throw new Error('오브젝트 스토어가 존재하지 않습니다.');
  }

  objectStore.delete(key);
}
