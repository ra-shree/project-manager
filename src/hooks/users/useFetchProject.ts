import { useQuery } from '@tanstack/react-query';
import { authApi } from '@utils/axios';

export const useFetchProject = ({ projectId }: { projectId?: string }) => {
  return useQuery({
    // was `project`
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await authApi.get(`/api/user/projects/${projectId}`);
      return response.data;
    },
  });
};
