import { authApi } from '../../utils/axios';
import { UserState } from './user';

export default async function getUserProfile() {
  const profile = await authApi.get('/api/user');
  const user: UserState = {
    id: profile.data.id,
    firstName: profile.data.first_name,
    lastName: profile.data.last_name,
    email: profile.data.email,
    role: profile.data.role,
  };
  return user;
}
