export interface SigninFormData {
  email: string;
  password: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role: string;
}

export interface ProjectFormData {
  title: string;
  description: string | null;
  manager_id: number;
  status: string;
}
