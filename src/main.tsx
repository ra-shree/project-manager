import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './utils';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Home } from './pages/Home';
import './index.css';
import GuestLayout from './components/layout/GuestLayout';
import { SignInForm } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import AuthLayout from './components/layout/AuthLayout';
import { HomeUser, HomeProject } from './pages/admin';
import { Projects, ProjectPage, Tasks } from './pages/users';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <div>About</div> },
      { path: '/pricing', element: <div>Pricing</div> },
      { path: '/contact', element: <div>Contact</div> },
      { path: '/signin', element: <SignInForm /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/user/projects', element: <Projects /> },
      { path: '/user/projects/:current_project_id', element: <ProjectPage /> },
      { path: '/user/tasks', element: <Tasks /> },
      { path: '/admin/users', element: <HomeUser /> },
      { path: '/admin/projects', element: <HomeProject /> },
      { path: '/admin/dashboard', element: <div>Dashboard</div> },
    ],
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
