import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ProjectsPage, UsersPage } from '@pages/admin';
import { AuthLayout, GuestLayout } from '@components/layout';
import { store } from './utils';
import { HomePage, SigninPage } from '@pages/guest';
import {
  ProjectDetailPage,
  UserProjectsPage,
  UserTasksPage,
} from '@pages/users';
import './index.css';
import { DashboardPage } from '@pages/DashboardPage';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '/', element: <SigninPage /> },
      { path: '/home', element: <HomePage /> },
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
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/user/projects', element: <UserProjectsPage /> },
      {
        path: '/user/projects/:current_project_id',
        element: <ProjectDetailPage />,
      },
      { path: '/user/tasks', element: <UserTasksPage /> },
      { path: '/admin/users', element: <UsersPage /> },
      { path: '/admin/projects', element: <ProjectsPage /> },
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
