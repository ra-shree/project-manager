export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'Draft' | 'In Progress' | 'Completed' | 'On Hold';
  manager_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
  project_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Report {
  admins: number | null;
  developers: number | null;
  managers: number | null;
  ongoing_project_count: number | null;
  completed_project_count: number | null;
  incomplete_task_count: number | null;
  project_count: number | null;
  developer_count: number | null;
  completed_task_count: number | null;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  email_verified_at: Date | null;
  updated_at: Date;
  created_at: Date;
  projects: Project[] | null;
  tasks: Task[] | null;
}
