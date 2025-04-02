export interface LinkTreeNode {
  href: string;
  label: string;
  children?: LinkTreeNode[];
}

export interface MultipleFormValueElement<T> {
  id: number;
  value: T;
}

export type MultipleFormValue<T> = MultipleFormValueElement<T>[];
