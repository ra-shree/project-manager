import { Footer, Navbar } from '@components/ui';
import { Outlet } from 'react-router-dom';

export function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
