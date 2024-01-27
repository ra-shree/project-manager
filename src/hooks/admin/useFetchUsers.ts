import { fetchUsers } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
