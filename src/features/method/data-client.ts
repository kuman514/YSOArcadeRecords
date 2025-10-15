'use client';

import { MethodDBColumn } from '^/src/entities/types/method';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { convertMethodDBColumnToMethod } from './util';

export async function getMethodListClientSide() {
  const result = await selectDataClientSide<MethodDBColumn[]>({
    select: '*',
    from: 'methods',
    where: [],
  });

  return result.map(convertMethodDBColumnToMethod);
}
