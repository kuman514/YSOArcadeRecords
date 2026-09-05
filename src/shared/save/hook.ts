'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { loadFromLocalStorage } from '^/src/shared/save/load';

import { saveToLocalStorage } from './save';

interface Params<T extends object> {
  isActive: boolean;
  key: string;
  delay: number;
  getParams: () => T | Promise<T>;
  onLoad: (loaded: T) => void;
}

export function useTempSave<T extends object>({
  isActive,
  key,
  delay,
  getParams,
  onLoad,
}: Params<T>) {
  const [isSaveActivated, setIsSaveActivated] = useState<boolean>(false);

  useEffect(() => {
    if (!isSaveActivated) {
      return;
    }

    const timeout = setTimeout(async () => {
      saveToLocalStorage(key, await getParams());
      toast('임시 저장이 완료되었습니다.', {
        type: 'success',
      });
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSaveActivated, getParams]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const loaded = loadFromLocalStorage<T>(key);
    if (!loaded) {
      setIsSaveActivated(true);
      return;
    }

    if (confirm('이전에 작성하던 포스트가 있습니다. 불러오시겠습니까?')) {
      onLoad(loaded);
    }
    setIsSaveActivated(true);
  }, [isActive]);
}
