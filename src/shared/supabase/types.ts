export enum ConditionType {
  EQUAL = 'eq',
  ILIKE = 'ilike',
  OR = 'or',
}

export interface OrWhere {
  type: ConditionType.OR;
  wheres: CompareWhere[];
}

export interface CompareWhere {
  type: ConditionType.EQUAL | ConditionType.ILIKE;
  column: string;
  value: string;
}

export type Where = OrWhere | CompareWhere;

export interface SelectOrder {
  column: string;
  isAscending: boolean;
}

export interface SelectRange {
  from: number;
  to: number;
}

export interface SelectQuery {
  select: string;
  from: string;
  where: Where[];
  order?: SelectOrder[];
  range?: SelectRange;
}

export interface InsertQuery<T> {
  insertInto: string;
  value: T;
}

export interface UpdateQuery<T> {
  update: string;
  set: T;
  where: Where[];
}

export interface DeleteQuery {
  deleteFrom: string;
  where: Where[];
}
