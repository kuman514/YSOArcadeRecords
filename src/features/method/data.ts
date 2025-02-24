import { Method, MethodDBColumn } from '^/src/entities/types/method';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

export async function getMethodList() {
  const result = await selectData<MethodDBColumn[]>({
    select: '*',
    from: 'methods',
    where: [],
  });

  return result;
}

export async function getMethod(methodId: Method['methodId']) {
  const result = await selectData<MethodDBColumn[]>({
    select: '*',
    from: 'methods',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'method_id',
        value: methodId,
      },
    ],
  });

  return result[0];
}
