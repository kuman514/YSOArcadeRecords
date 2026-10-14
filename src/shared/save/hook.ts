'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { IS_PRODUCTION } from '^/src/shared/util/is-production';

import { OBJECT_STORE_NAME } from './constants';
import { deleteFromIndexedDatabase } from './delete';
import { loadFromIndexedDatabase } from './load';
import { saveToIndexedDatabase } from './save';

interface Params<T extends object> {
  isActive: boolean;
  key: string;
  delay: number;
  lastEditedAt: number;
  isCompleted: boolean;
  getParams: () => T | Promise<T>;
  onLoad: (loaded: T) => void;
}

export function useTempSave<T extends object>({
  isActive,
  key,
  delay,
  lastEditedAt,
  isCompleted,
  getParams,
  onLoad,
}: Params<T>) {
  const [isSaveActivated, setIsSaveActivated] = useState<boolean>(false);
  const [database, setDatabase] = useState<IDBDatabase | null>(null);

  const isLoadAnsweredRef = useRef<boolean>(false);

  useEffect(() => {
    const indexedDBRequest = indexedDB.open(
      IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'
    );
    indexedDBRequest.onerror = () => {
      toast('indexedDB에 연결할 수 없습니다.', {
        type: 'error',
      });
    };
    indexedDBRequest.onsuccess = () => {
      setDatabase(indexedDBRequest.result);
    };
    indexedDBRequest.onupgradeneeded = () => {
      indexedDBRequest.result.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: 'key',
      });
    };
  }, []);

  useEffect(() => {
    if (!isCompleted || !database) {
      return;
    }
    deleteFromIndexedDatabase(key, database);
  }, [isCompleted, database]);

  useEffect(() => {
    if (!database) {
      return;
    }
    return () => {
      database.close();
    };
  }, [database]);

  useEffect(() => {
    if (!isSaveActivated || !database) {
      return;
    }

    const timeout = setTimeout(async () => {
      await saveToIndexedDatabase(key, await getParams(), database);
      toast('임시 저장이 완료되었습니다.', {
        type: 'success',
      });
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSaveActivated, database, lastEditedAt]);

  useEffect(() => {
    if (!isActive || !database) {
      return;
    }

    (async () => {
      if (isLoadAnsweredRef.current) {
        return;
      }

      const loaded = await loadFromIndexedDatabase<T>(key, database);
      if (!loaded) {
        setIsSaveActivated(true);
        return;
      }

      if (confirm('이전에 작성하던 포스트가 있습니다. 불러오시겠습니까?')) {
        onLoad(loaded);
      }
      isLoadAnsweredRef.current = true;
      setIsSaveActivated(true);
    })();
  }, [isActive, database]);
}
