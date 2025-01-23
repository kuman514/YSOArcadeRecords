export interface AuthActionState {
  errors?: {
    email?: string;
    password?: string;
    name?: string;
  };
}
