import {
  Project,
  ProjectDetails,
  Task,
  User,
} from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchProject = async (
  projectId?: string
): Promise<ProjectDetails> => {
  const response = await authApi.get(`/api/user/projects/${projectId}`);
  return response.data;
};

export const fetchDeveloper = async (projectId?: string): Promise<User[]> => {
  const response = await authApi.get(`/api/user/members/${projectId}`);
  return response.data;
};

export const fetchProjects = async (): Promise<Project> => {
  const response = await authApi.get('/api/user/projects');
  return response.data;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await authApi.get(`/api/user/tasks`);
  return response.data;
};
