import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
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
import { useSelector } from 'react-redux';

export default function App() {
  const [userInfo, setUserInfo] = useState<UserState>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <Box>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/dashboard"
            element={<Dashboard userInfo={userInfo} />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/admin/users" element={<HomeUser />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/projects" element={<HomeProject />} />
          <Route path="/admin/projects/create" element={<CreateProject />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
