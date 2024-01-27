import { fetchProjectSummary } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchProjectSummary = () => {
  return useQuery({
    // was project.admin.new
    queryKey: ['project.summary'],
    queryFn: fetchProjectSummary,
  });
};
