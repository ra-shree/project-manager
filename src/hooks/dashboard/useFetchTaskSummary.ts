import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchTaskSummary = () => {
  return useQuery({
    // was task.new
    queryKey: ['task.summary'],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/summary/tasks`);
      return response.data;
    },
  });
};
