import { createServerSideClient } from './server';
import { EqualityCondition } from './types';

export async function readData<T>(
  target: string,
  equalityCondition?: EqualityCondition,
  secondEqualityCondition?: EqualityCondition
) {
  const supabase = await createServerSideClient();
  const { data: result, error } = equalityCondition
    ? secondEqualityCondition
      ? await supabase
          .from(target)
          .select('*')
          .eq(equalityCondition.column, equalityCondition.value)
          .eq(secondEqualityCondition.column, secondEqualityCondition.value)
      : await supabase
          .from(target)
          .select('*')
          .eq(equalityCondition.column, equalityCondition.value)
    : await supabase.from(target).select('*');

  if (error || !result) {
    throw new Error('Failed to add data.');
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
