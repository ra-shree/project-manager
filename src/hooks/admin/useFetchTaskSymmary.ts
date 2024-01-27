import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchTaskSummary = () => {
  return useQuery({
    // was task.admin.new
    queryKey: ['task.summary'],
    queryFn: async () => {
      const response = await authApi.get(`/api/admin/summary/task/new`);
      return response.data;
    },
  });
};
