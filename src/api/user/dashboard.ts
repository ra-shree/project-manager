import { Project, User, UserReport } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchProjectSummary = async (): Promise<Project[]> => {
  const response = await authApi.get('/api/user/summary/projects');
  return response.data;
};

export const fetchReport = async (): Promise<UserReport> => {
  const response = await authApi.get('/api/user/summary/count');
  return response.data;
};

export const fetchTaskSummary = async (): Promise<User[]> => {
  const response = await authApi.get('/api/user/summary/tasks');
  return response.data;
};
