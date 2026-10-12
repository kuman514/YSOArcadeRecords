'use client';

export function loadFromLocalStorage<T extends object>(key: string) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return JSON.parse(data) as unknown as T;
}

export async function loadFromIndexedDatabase<T extends object>(
  key: string,
  database: IDBDatabase
) {
  const objectStore = database
    .transaction('TempSaved', 'readonly')
    .objectStore('TempSaved');

  if (!objectStore) {
    throw new Error('오브젝트 스토어가 존재하지 않습니다.');
  }

  return await new Promise<T | null>((resolve, reject) => {
    const getRequest = objectStore.get(key);
    getRequest.onsuccess = () => {
      if (!getRequest.result) {
        console.log(`${key} 존재하지 않음.`);
        resolve(null);
      } else {
        console.log(`${key} 존재함.`);
        resolve(getRequest.result as unknown as T);
      }
    };
    getRequest.onerror = () => {
      reject(`${key} 데이터 검색 실패.`);
    };
  });
}
