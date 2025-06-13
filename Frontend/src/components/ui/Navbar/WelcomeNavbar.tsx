import { Link } from 'react-router-dom';
export default function WelcomeNavbar() {
  return (
    <nav className="bg-gray-800 px-4 py-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ResumeApp</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/auth/sign-in" className="text-white bg-blue-600 px-3 py-1 rounded">Login</Link>
        </div>
      </div>
    </nav>
  );
}
