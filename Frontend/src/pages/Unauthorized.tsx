
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg mb-6 text-gray-700">
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
