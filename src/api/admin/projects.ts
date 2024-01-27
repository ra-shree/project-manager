import { Project } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await authApi.get('/api/admin/projects');
  return response.data;
};
