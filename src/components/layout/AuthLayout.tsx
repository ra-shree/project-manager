import { Outlet } from 'react-router-dom';
import { Footer, Loading, Navbar } from '@components/ui';
import { useFetchAuthUser } from '@hooks/users';

export function AuthLayout() {
  const { isFetching } = useFetchAuthUser();

  if (isFetching) {
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
