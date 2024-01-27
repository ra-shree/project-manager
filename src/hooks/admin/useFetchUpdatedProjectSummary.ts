import { fetchUpdatedProjectSummary } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchUpdatedProjectSummary = () => {
  return useQuery({
    // was project.admin.updated
    queryKey: ['project.updated.summary'],
    queryFn: fetchUpdatedProjectSummary,
  });
};
