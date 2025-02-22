import { createServerSideClient } from './server';
import {
  ConditionType,
  EqualityCondition,
  InsertQuery,
  SelectQuery,
  UpdateQuery,
} from './types';

export async function selectData<T>({ select, from, where }: SelectQuery) {
  const supabase = await createServerSideClient();

  const { data: result, error } = await where.reduce((accFilter, curWhere) => {
    switch (curWhere.type) {
      case ConditionType.EQUAL:
        return accFilter.eq(curWhere.column, curWhere.value);
      default:
        return accFilter;
    }
  }, supabase.from(from).select(select));

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

export async function deleteData(
  target: string,
  equalityCondition: EqualityCondition
) {
  const supabase = await createServerSideClient();
  const { error } = await supabase
    .from(target)
    .delete()
    .eq(equalityCondition.column, equalityCondition.value);

  if (error) {
    throw new Error('Failed to delete data.');
  }
}
