import { fetchProject } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchProject = ({ projectId }: { projectId?: string }) => {
  return useQuery({
    // was `project`
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  });
};
