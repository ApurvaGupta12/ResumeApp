import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

import {
  Disclosure, DisclosureButton, DisclosurePanel,
  Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Utility function to generate background based on character
const getBackgroundColor = (char: string): string => {
  const colors: { [key: string]: string } = {
    A: 'bg-red-200 text-red-800',
    B: 'bg-green-200 text-green-800',
    C: 'bg-blue-200 text-blue-800',
    D: 'bg-yellow-200 text-yellow-800',
    E: 'bg-pink-200 text-pink-800',
    F: 'bg-purple-200 text-purple-800',
    G: 'bg-teal-200 text-teal-800',
    H: 'bg-orange-200 text-orange-800',
    I: 'bg-lime-200 text-lime-800',
    J: 'bg-cyan-200 text-cyan-800',
    K: 'bg-rose-200 text-rose-800',
    L: 'bg-indigo-200 text-indigo-800',
    M: 'bg-emerald-200 text-emerald-800',
    N: 'bg-amber-200 text-amber-800',
    O: 'bg-sky-200 text-sky-800',
    P: 'bg-violet-200 text-violet-800',
    Q: 'bg-fuchsia-200 text-fuchsia-800',
    R: 'bg-stone-200 text-stone-800',
    S: 'bg-lime-200 text-lime-800',
    T: 'bg-cyan-200 text-cyan-800',
    U: 'bg-red-100 text-red-800',
    V: 'bg-blue-100 text-blue-800',
    W: 'bg-yellow-100 text-yellow-800',
    X: 'bg-gray-200 text-gray-800',
    Y: 'bg-green-100 text-green-800',
    Z: 'bg-pink-100 text-pink-800',
  };

  const upperChar = char.toUpperCase();
  return colors[upperChar] || 'bg-gray-300 text-gray-800';
};
export default function Navbar(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated,setUser, setIsAuthenticated, logout, user } = useAuthContext();
 useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user", err);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
      navigate('/auth/sign-in');
    }
  };

  fetchUser();
}, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      navigate("/auth/sign-in");
    }
  };

  const adminLinks = [
  { to: '/admin-dashboard/templates', label: 'Dashboard' },
  { to: '/admin/users', label: 'Manage Users' },
  { to: '/admin/settings', label: 'Settings' },
];

// User links
const userLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/resumeTemp', label: 'Resume Templates' },
  { to: '/resumeScreen', label: 'Resume Screening' },
  { to: '/services', label: 'Services' },
  { to: '/faqpage', label: 'FAQ' },
];
// Role check
const navLinks = user?.role === 'admin' ? adminLinks : userLinks;
  const getNavClass = (path: string) =>
    location.pathname.startsWith(path)
      ? 'bg-gray-900 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white';
//useEffect(() => {
  //console.log("USER:", user);
//}, [user]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </DisclosureButton>
              </div>

              {/* Logo and Desktop Nav */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>

                {/* Desktop Nav */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navLinks.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        className={`${getNavClass(to)} rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications & Profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" />
                </button>

                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="rounded-full bg-gray-800 text-sm focus:outline-none">
                        {user?.image ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt="User Profile Picture"
                          />
                        ) : (
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center font-medium uppercase ${getBackgroundColor(user?.name?.charAt(0) || '')}`}
                          >
                            {user?.name?.charAt(0)}
                          </div>
                        )}
                      </MenuButton>
                    </div>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg py-1 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link to="/profile" className={`block px-4 py-2 text-sm text-gray-700 ${active && 'bg-gray-100'}`}>
                            Your Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link to="/settings" className={`block px-4 py-2 text-sm text-gray-700 ${active && 'bg-gray-100'}`}>
                            Settings
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${active && 'bg-gray-100'}`}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link
                    to="/auth/sign-in"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Account
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Nav Links */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map(({ to, label }) => (
                <DisclosureButton
                  key={to}
                  as={Link}
                  to={to}
                  className={`${getNavClass(to)} block rounded-md px-3 py-2 text-base font-medium`}
                >
                  {label}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
