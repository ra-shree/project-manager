import { User } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchProjectSummary = async (): Promise<User[]> => {
  const response = await authApi.get('/api/user/summary/projects');
  return response.data;
};

export const fetchReport = async (): Promise<Report> => {
  const response = await authApi.get('/api/user/summary/count');
  return response.data;
};

export const fetchTaskSummary = async (): Promise<User[]> => {
  const response = await authApi.get('/api/user/summary/tasks');
  return response.data;
};
