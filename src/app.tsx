import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Home } from './pages/Home';
import { SignInForm } from './pages/SignIn';
import { SignUpForm } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import {
  CreateProject,
  CreateUser,
  HomeProject,
  HomeUser,
} from './pages/admin';
import { UserState } from './features';
import { getUserProfile } from './features';

export default function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserState>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    (async function fetchUserData() {
      try {
        const user = await getUserProfile();
        setUserInfo(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Navbar userInfo={userInfo} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard userInfo={userInfo} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/admin/users" element={<HomeUser />} />
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/projects" element={<HomeProject />} />
        <Route path="/admin/projects/create" element={<CreateProject />} />
      </Routes>
      <Footer />
    </>
  );
}
