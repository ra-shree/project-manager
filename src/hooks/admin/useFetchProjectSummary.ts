import { fetchNewProjectSummary } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchProjectSummary = () => {
  return useQuery({
    // was project.admin.new
    queryKey: ['project.summary'],
    queryFn: fetchNewProjectSummary,
  });
};
