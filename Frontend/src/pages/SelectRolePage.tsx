import { useNavigate } from 'react-router-dom';

export default function SelectRolePage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('selectedRole', role);  
    navigate('/auth/sign-in');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Please select your role</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleRoleSelect('USER')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          I am a User
        </button>
        <button
          onClick={() => handleRoleSelect('ADMIN')}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          I am an Admin
        </button>
      </div>
    </div>
  );
}
