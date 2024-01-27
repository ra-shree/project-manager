import { User } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await authApi.get('/api/admin/users');
  return response.data;
};
