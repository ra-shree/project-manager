import { Project, Task, AdminReport } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchNewProjectSummary = async (): Promise<Project[]> => {
  const response = await authApi.get('/api/admin/summary/project', {
    params: { project: 'new' },
  });
  return response.data;
};

export const fetchUpdatedProjectSummary = async (): Promise<Project[]> => {
  const response = await authApi.get('/api/admin/summary/project', {
    params: { project: 'updated' },
  });
  return response.data;
};

export const fetchTaskSummary = async (): Promise<Task[]> => {
  const response = await authApi.get('/api/admin/summary/task', {
    params: {
      task: 'new',
    },
  });
  return response.data;
};

export const fetchReport = async (): Promise<AdminReport> => {
  const response = await authApi.get('/api/admin/summary');
  return response.data;
};
