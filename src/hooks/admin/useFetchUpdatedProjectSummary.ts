import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchUpdatedProjectSummary = () => {
  return useQuery({
    // was project.admin.updated
    queryKey: ['project.updated.summary'],
    queryFn: async () => {
      const response = await authApi.get(`/api/admin/summary/project/updated`);
      return response.data;
    },
  });
};
