'use client';

import { OBJECT_STORE_NAME } from './constants';

export function saveToLocalStorage<T extends object>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function saveToIndexedDatabase<T extends object>(
  key: string,
  value: T,
  database: IDBDatabase
) {
  const objectStore = database
    .transaction(OBJECT_STORE_NAME, 'readwrite')
    .objectStore(OBJECT_STORE_NAME);

  if (!objectStore) {
    throw new Error('오브젝트 스토어가 존재하지 않습니다.');
  }

  console.log('저장 중.', key, value);
  await new Promise((resolve, reject) => {
    const getRequest = objectStore.get(key);
    getRequest.onsuccess = () => {
      if (!getRequest.result) {
        console.log(`${key} 존재하지 않음. 새로 생성함.`);
        const addRequest = objectStore.add({
          key,
          ...value,
        });
        addRequest.onsuccess = () => {
          resolve(null);
        };
        addRequest.onerror = () => {
          reject(`${key} 데이터 신규 생성 실패.`);
        };
      } else {
        console.log(`${key} 존재함. 덮어쓰는 중.`);
        const putRequest = objectStore.put({
          key,
          ...value,
        });
        putRequest.onsuccess = () => {
          resolve(null);
        };
        putRequest.onerror = () => {
          reject(`${key} 데이터 덮어쓰기 실패.`);
        };
      }
    };
    getRequest.onerror = () => {
      reject(`${key} 데이터 검색 실패.`);
    };
  });
}
