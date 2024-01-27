import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchProjectSummary = () => {
  return useQuery({
    // was project.admin.new
    queryKey: ['project.summary'],
    queryFn: async () => {
      const response = await authApi.get(`/api/admin/summary/project/new`);
      return response.data;
    },
  });
};
