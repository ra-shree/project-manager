import { fetchReport } from '@api/user';
import { useQuery } from '@tanstack/react-query';

export const useFetchReport = () => {
  return useQuery({
    queryKey: ['report'],
    queryFn: fetchReport,
  });
};
