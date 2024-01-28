import { fetchTasks } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchTasks = () => {
  return useQuery({
    queryKey: [`tasks`],
    queryFn: fetchTasks,
  });
};
