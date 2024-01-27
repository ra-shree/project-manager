import { User } from '@interfaces/fetch.interface';
import { authApi } from '@utils/axios';

export const fetchUser = async (): Promise<User> => {
  const response = await authApi.get('api/user');
  return response.data;
};
