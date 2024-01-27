import { Footer } from '@components/ui';
import { Outlet } from 'react-router-dom';

export function GuestLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
