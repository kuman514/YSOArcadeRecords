'use client';

export function loadFromLocalStorage<T extends object>(key: string) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  return JSON.parse(data) as unknown as T;
}
