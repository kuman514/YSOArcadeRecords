import { Method, MethodDBColumn } from '^/src/entities/types/method';

export function convertMethodDBColumnToMethod({
  method_id,
  method_name,
}: MethodDBColumn): Method {
  return {
    methodId: method_id,
    label: method_name,
  };
}
