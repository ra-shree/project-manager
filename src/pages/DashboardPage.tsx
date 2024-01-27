import { useAppSelector } from '@utils/redux';
import { UserState } from 'features';
import { AdminDashboardPage } from './admin';
import { ManagerDashboardPage, UserDashboardPage } from './users';

export default function DashboardPage() {
  const user: UserState = useAppSelector((state: any) => state.user);

  if (user.role == 'admin') {
    return <AdminDashboardPage />;
  }

  if (user.role == 'developer') {
    return <UserDashboardPage />;
  }

  if (user.role == 'manager') {
    return <ManagerDashboardPage />;
  }
}
