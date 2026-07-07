'use client';

export function saveToLocalStorage(
  key: string,
  value: number | string | object
) {
  localStorage.setItem(key, JSON.stringify(value));
}
