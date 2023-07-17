import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { GuestNavbar, Footer, UserNavbar } from './components/layout';
import { SignInForm } from './pages/SignIn';
import { SignUpForm } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';

export default function App() {
  const authenticated = sessionStorage.getItem('user') === null ? false : true;
  return (
    <>
      {authenticated ? <UserNavbar /> : <GuestNavbar />}
      <Box>
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
