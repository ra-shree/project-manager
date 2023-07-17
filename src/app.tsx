import { Route, Routes } from 'react-router-dom';
import { GuestNavbar, Footer, UserNavbar } from './components/layout';
import { SignInForm } from './pages/SignIn';
import { SignUpForm } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
export default function App() {
  const authenticated = sessionStorage.getItem('user') === null ? false : true;
  return (
    <div>
      {authenticated ? <UserNavbar /> : <GuestNavbar />}
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}
