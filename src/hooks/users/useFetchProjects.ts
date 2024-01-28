import { fetchProjects } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
