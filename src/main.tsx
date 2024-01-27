import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { AdminDashboard, ProjectsPage, UsersPage } from '@pages/admin';
import { AuthLayout, GuestLayout } from '@components/layout';
import { store } from './utils';
import { HomePage, SigninPage } from '@pages/guest';
import {
  UserDashboardPage,
  ManagerDashboardPage,
  ProjectDetailPage,
  TasksPage,
} from '@pages/users';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <div>About</div> },
      { path: '/pricing', element: <div>Pricing</div> },
      { path: '/contact', element: <div>Contact</div> },
      { path: '/signin', element: <SigninPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/dashboard', element: <UserDashboardPage /> },
      { path: '/manager/dashboard', element: <ManagerDashboardPage /> },
      { path: '/user/projects', element: <ProjectsPage /> },
      {
        path: '/user/projects/:current_project_id',
        element: <ProjectDetailPage />,
      },
      { path: '/user/tasks', element: <TasksPage /> },
      { path: '/admin/users', element: <UsersPage /> },
      { path: '/admin/projects', element: <ProjectsPage /> },
      { path: '/admin/dashboard', element: <AdminDashboard /> },
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
