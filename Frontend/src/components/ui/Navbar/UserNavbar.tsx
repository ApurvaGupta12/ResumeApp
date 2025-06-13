import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function UserNavbar() {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const userLinks = [
    { path: '/about', label: 'About' },
    { path: '/resumeTemp', label: 'Templates' },
    // { path: '/resume-builder', label: 'Resume Builder' },
    { path: '/resumeScreen', label: 'Upload Resume' },
    // { path: '/ai-feedback', label: 'AI Feedback' },
    // { path: '/recommendations', label: 'Job Recommendations' },
  ];

  return (
    <nav className="bg-gray-800 px-4 py-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ResumeApp</Link>
        <div className="space-x-4 flex items-center">
          {userLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          
          {/* User name clickable to profile page */}
          {user?.fullName && (
            <Link
              to="/profile"
              className="text-white font-medium hover:underline ml-4"
              title="Go to Profile"
            >
              {user.fullName}
            </Link>
          )}
          
          <Button
            variant="destructive"
            onClick={() => {
              logout();
              navigate('/auth/sign-in');
            }}
            className="ml-4"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
