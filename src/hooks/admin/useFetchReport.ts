import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchReport = () => {
  return useQuery({
    // was report.admin
    queryKey: ['report'],
    queryFn: async () => {
      const response = await authApi.get(`/api/admin/summary/count`);
      return response.data;
    },
  });
};
