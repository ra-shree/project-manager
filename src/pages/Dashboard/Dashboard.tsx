import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../utils';
import { setUser } from '../../features/user';
import { UserState } from '../../features/types';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<UserState>();
  useEffect(() => {
    async function getProfile() {
      const profile = await api.get('/api/user');
      const userInfo: UserState = {
        id: profile.data.id,
        firstName: profile.data.first_name,
        lastName: profile.data.last_name,
        email: profile.data.email,
      };
      setProfile(userInfo);
      dispatch(setUser(userInfo));
    }

    getProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, User
        {profile === undefined ? 'user' : profile['firstName']}
      </p>
    </div>
  );
}
