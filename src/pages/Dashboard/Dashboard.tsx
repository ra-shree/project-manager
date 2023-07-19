import { UserState } from '../../features/user/user';

export default function Dashboard({ userInfo }: { userInfo?: UserState }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {!userInfo ? 'user' : userInfo?.firstName}</p>
    </div>
  );
}
