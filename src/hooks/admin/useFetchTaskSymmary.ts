import { fetchTaskSummary } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchTaskSummary = () => {
  return useQuery({
    // was task.admin.new
    queryKey: ['task.summary'],
    queryFn: fetchTaskSummary,
  });
};
