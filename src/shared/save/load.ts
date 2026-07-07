'use client';

export function loadFromLocalStorage<T>(key: string) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return JSON.parse(data) as unknown as T;
}
