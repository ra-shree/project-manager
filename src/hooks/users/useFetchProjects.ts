import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await authApi.get('/api/user/projects');
      return response.data;
    },
  });
};
