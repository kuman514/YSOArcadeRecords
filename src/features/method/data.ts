import { Method, MethodDBColumn } from '^/src/entities/types/method';
import {
  deleteData,
  selectData,
  updateData,
} from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertMethodDBColumnToMethod } from './util';

export async function getMethodList() {
  const result = await selectData<MethodDBColumn[]>({
    select: '*',
    from: 'methods',
    where: [],
  });

  return result.map(convertMethodDBColumnToMethod);
}

export async function modifyMethod(
  methodId: Method['methodId'],
  newMethod: Method
) {
  await updateData<MethodDBColumn>({
    update: 'arcade_info',
    set: {
      method_id: newMethod.methodId,
      method_name: newMethod.label,
    },
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'method_id',
        value: methodId,
      },
    ],
  });
}

export async function deleteMethod(methodId: Method['methodId']) {
  await deleteData({
    deleteFrom: 'methods',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'method_id',
        value: methodId,
      },
    ],
  });
}
