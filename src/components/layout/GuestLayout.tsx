import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '..';

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
