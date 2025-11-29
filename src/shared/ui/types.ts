export interface LinkTreeNode {
  href: string;
  label: string;
  children?: LinkTreeNode[];
}

export interface MultipleFormValueElement<T> {
  tmpId: string;
  value: T;
}

export type MultipleFormValue<T> = MultipleFormValueElement<T>[];
