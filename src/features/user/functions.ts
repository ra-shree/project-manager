import { authApi } from '../../utils/axios';
import { UserState } from './user';

export default async function getUserProfile() {
  let defaultUser: UserState = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  } as UserState;

  const token = localStorage.getItem('token');
  if (!token) {
    return defaultUser;
  }

  const profile = await authApi.get('/api/user');
  defaultUser = {
    id: profile.data.id,
    firstName: profile.data.first_name,
    lastName: profile.data.last_name,
    email: profile.data.email,
    role: profile.data.role,
  };
  return defaultUser;
}
