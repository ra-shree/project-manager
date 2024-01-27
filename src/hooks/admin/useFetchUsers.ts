import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../utils';

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await authApi.get('/api/admin/users');
      return response.data;
    },
  });
};
