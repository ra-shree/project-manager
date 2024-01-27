import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../utils';

export const useFetchTasks = () => {
  return useQuery({
    queryKey: [`tasks`],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/tasks`);
      return response.data;
    },
  });
};
