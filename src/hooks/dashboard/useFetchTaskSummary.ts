import { fetchTaskSummary } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchTaskSummary = () => {
  return useQuery({
    // was task.new
    queryKey: ['task.summary'],
    queryFn: fetchTaskSummary,
  });
};
