import { fetchReport } from '@api/admin';
import { useQuery } from '@tanstack/react-query';

export const useFetchReport = () => {
  return useQuery({
    // was report.admin
    queryKey: ['report'],
    queryFn: fetchReport,
  });
};
