import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Navbar, Footer, Loading } from '..';
import { setUser } from '../../features';
import { authApi } from '../../utils';

export default function AuthLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userQuery = useQuery(
    ['user'],
    async () => {
      const res = await authApi.get('api/user');
      return res.data;
    },
    {
      onSuccess(data) {
        dispatch(
          setUser({
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            role: data.role,
          })
        );
      },
    }
  );

  if (userQuery.isError) {
    navigate('/login');
  }

  if (userQuery.isFetching) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
