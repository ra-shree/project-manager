import { fetchManagers } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchManagers = () => {
  return useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  });
};
