import { fetchDeveloper } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchDeveloper = ({ projectId }: { projectId?: string }) => {
  return useQuery({
    queryKey: ['project.developers', projectId],
    queryFn: () => fetchDeveloper(projectId),
  });
};
