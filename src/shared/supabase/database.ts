import { createServerSideClient } from './server';
import { ConditionType, EqualityCondition, SelectQuery } from './types';

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

export async function addData<T>(target: string, newData: T) {
  const supabase = await createServerSideClient();
  const { data: result, error } = await supabase
    .from(target)
    .insert(newData)
    .select();

  if (error || !result) {
    throw new Error('Failed to add data.');
  }

  return result[0].id;
}

export async function updateData<T>(
  target: string,
  newData: T,
  equalityCondition: EqualityCondition
) {
  const supabase = await createServerSideClient();
  const { error } = await supabase
    .from(target)
    .update(newData)
    .eq(equalityCondition.column, equalityCondition.value);

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
