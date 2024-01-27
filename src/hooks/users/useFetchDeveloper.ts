import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchDeveloper = ({ projectId }: { projectId?: string }) => {
  return useQuery({
    queryKey: ['project.developers', projectId],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/members/${projectId}`);
      return response.data;
    },
  });
};
