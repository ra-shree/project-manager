import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchReport = () => {
  return useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/summary/count`);
      return response.data;
    },
  });
};
