import { MethodDBColumn } from '^/src/entities/types/method';
import { selectData } from '^/src/shared/supabase/database';

import { convertMethodDBColumnToMethod } from './util';

export async function getMethodList() {
  const result = await selectData<MethodDBColumn[]>({
    select: '*',
    from: 'methods',
    where: [],
  });

  return result.map(convertMethodDBColumnToMethod);
}
