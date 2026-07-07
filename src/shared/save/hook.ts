'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { loadFromLocalStorage } from '^/src/shared/save/load';

import { saveToLocalStorage } from './save';

interface Params<T extends object> {
  isActive: boolean;
  key: string;
  params: T;
  delay: number;
  onLoad: (loaded: T) => void;
}

export function useTempSave<T extends object>({
  isActive,
  key,
  params,
  delay,
  onLoad,
}: Params<T>) {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timeout = setTimeout(() => {
      saveToLocalStorage(key, params);
      toast('임시 저장이 완료되었습니다.', {
        type: 'success',
      });
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [isActive, ...Object.values(params)]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const loaded = loadFromLocalStorage<T>(key);
    if (!loaded) {
      return;
    }

    if (confirm('이전에 작성하던 포스트가 있습니다. 불러오시겠습니까?')) {
      onLoad(loaded);
    }
  }, [isActive]);
}
