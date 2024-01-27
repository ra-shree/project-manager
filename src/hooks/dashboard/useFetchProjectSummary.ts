import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchProjectSummary = () => {
  return useQuery({
    // was project.admin.new
    queryKey: ['project.summary'],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/summary/projects`);
      return response.data;
    },
  });
};
