export interface CreateTaskFormData {
  id?: number;
  title: string;
  description: string | null;
  project_id: number;
  user_id: number;
}

export interface TaskCheckboxProps {
  id: number;
  completed: boolean;
}
