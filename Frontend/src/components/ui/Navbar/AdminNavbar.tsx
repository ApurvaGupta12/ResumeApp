// src/components/Navbar/AdminNavbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function AdminNavbar() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const adminLinks = [
    // { path: '/dashboard', label: 'Dashboard' },
    { path: '/admin-dashboard/users', label: 'Users' },
    { path: '/admin-dashboard/templates', label: 'All Templates' },
    // { path: '/feedback', label: 'Feedback' },
  ];

  return (
    <nav className="bg-gray-800 px-4 py-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Admin Panel</Link>
        <div className="space-x-4">
          {adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-white font-medium">{user?.fullName}</span>
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              navigate('/auth/sign-in');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
