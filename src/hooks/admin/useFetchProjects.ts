import { fetchProjects } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
