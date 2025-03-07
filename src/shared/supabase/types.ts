export enum ConditionType {
  EQUAL = 'equal',
}

export interface EqualityWhere {
  type: ConditionType;
  column: string;
  value: string;
}

export type Where = EqualityWhere;

export interface SelectQuery {
  select: string;
  from: string;
  where: Where[];
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
