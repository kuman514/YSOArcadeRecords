export interface Method {
  methodId: string;
  label: string;
}

export interface HavingMethod {
  /**
   * The place or game console the play happened on.
   */
  method: Method;
}

export interface MethodDBColumn {
  method_id: Method['methodId'];
  method_title: Method['label'];
}
