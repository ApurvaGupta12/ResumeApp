import { useAuthContext } from '@/context/AuthContext';
import WelcomeNavbar from './WelcomeNavbar';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';
import { JSX } from 'react';

export default function CommanNav(): JSX.Element {
  const { user, isAuthenticated } = useAuthContext();

  if (!isAuthenticated||!user) {
    return <WelcomeNavbar />;
  }
   const role = user.role?.toLowerCase().trim();

  if (role === 'admin') {
    return <AdminNavbar/>;
  }
  

  return <UserNavbar />;
}
