import { AdminDashboardPage } from './admin';
import { ManagerDashboardPage, UserDashboardPage } from './users';
import { useAppSelector } from '@utils/redux';

export function DashboardPage() {
  const user = useAppSelector((state: any) => state.user);

  if (user?.role == 'admin') {
    return <AdminDashboardPage />;
  }

  if (user?.role == 'developer') {
    return <UserDashboardPage />;
  }

  if (user?.role == 'manager') {
    return <ManagerDashboardPage />;
  }
}
