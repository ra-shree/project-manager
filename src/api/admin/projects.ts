import { Project, User } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await authApi.get('/api/admin/projects');
  return response.data;
};

export const fetchManagers = async (): Promise<User[]> => {
  const response = await authApi.get('/api/admin/users', {
    params: {
      role: 'manager',
    },
  });
  return response.data;
};
