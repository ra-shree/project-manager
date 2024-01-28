export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'Draft' | 'In Progress' | 'Completed' | 'On Hold';
  manager_id: number;
  created_at: Date;
  updated_at: Date;
  manager?: User | null;
}

export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  status: 'Draft' | 'In Progress' | 'Completed' | 'On Hold';
  manager_id: number;
  created_at: Date;
  updated_at: Date;
  members?: User[] | null;
  tasks?: Task[] | null;
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
  assigned: User | null;
}

export interface UserReport {
  incomplete_task_count: number;
  project_count: number;
  developer_count: number;
  completed_task_count: number;
}

export interface AdminReport {
  admins: number;
  developers: number;
  managers: number;
  ongoing_project_count: number;
  completed_project_count: number;
  completed_task_count: number;
  incomplete_task_count: number;
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
