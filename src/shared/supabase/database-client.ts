import { createClientSideClient } from './client';
import { ConditionType, SelectQuery } from './types';

export async function selectDataClientSide<T>({
  select,
  from,
  where,
  order,
  range,
}: SelectQuery) {
  const supabase = createClientSideClient();

  const rawQuery = supabase.from(from).select(select);
  const queryWithWhere = where.reduce((accFilter, curWhere) => {
    switch (curWhere.type) {
      case ConditionType.EQUAL:
        return accFilter.eq(curWhere.column, curWhere.value);
      default:
        return accFilter;
    }
  }, rawQuery);
  const queryWithOrder = (order ?? []).reduce(
    (accFilter, curOrder) =>
      accFilter.order(curOrder.column, { ascending: curOrder.isAscending }),
    queryWithWhere
  );

  const finalQuery = range
    ? queryWithOrder.range(range.from, range.to)
    : queryWithOrder;

  const { data: result, error } = await finalQuery;

  if (error || !result) {
    throw new Error('Failed to select data.');
  }

  return result as T;
}
