'use client';

export function saveToLocalStorage<T extends object>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
