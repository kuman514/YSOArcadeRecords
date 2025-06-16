import { createServerSideClient } from './server';
import {
  ConditionType,
  DeleteQuery,
  InsertQuery,
  SelectQuery,
  UpdateQuery,
} from './types';

export async function selectData<T>({
  select,
  from,
  where,
  order,
  range,
}: SelectQuery) {
  const supabase = await createServerSideClient();

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

export async function insertData<T>({ insertInto, value }: InsertQuery<T>) {
  const supabase = await createServerSideClient();
  const { error } = await supabase.from(insertInto).insert(value);

  if (error) {
    throw new Error('Failed to insert data.');
  }
}

export async function updateData<T>({ update, set, where }: UpdateQuery<T>) {
  const supabase = await createServerSideClient();

  const { error } = await where.reduce((accFilter, curWhere) => {
    switch (curWhere.type) {
      case ConditionType.EQUAL:
        return accFilter.eq(curWhere.column, curWhere.value);
      default:
        return accFilter;
    }
  }, supabase.from(update).update(set));

  if (error) {
    throw new Error('Failed to modify data.');
  }
}

export async function deleteData({ deleteFrom, where }: DeleteQuery) {
  const supabase = await createServerSideClient();

  const { error } = await where.reduce((accFilter, curWhere) => {
    switch (curWhere.type) {
      case ConditionType.EQUAL:
        return accFilter.eq(curWhere.column, curWhere.value);
      default:
        return accFilter;
    }
  }, supabase.from(deleteFrom).delete());

  if (error) {
    throw new Error('Failed to modify data.');
  }
}
