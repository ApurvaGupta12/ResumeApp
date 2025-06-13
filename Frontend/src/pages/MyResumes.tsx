import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeData } from "@/types/ResumeData";
import axiosInstance from "@/api/axiosInstance";

const MyResumes = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const response = await axiosInstance.get("/resumes/my-resumes");
      console.log("API Response Data:", response.data);
      if (Array.isArray(response.data)) {
        setResumes(response.data);
      } else {
        console.error("API response data is not an array:", response.data);
        setResumes([]);
      }
    } catch (error) {
      console.error("Failed to fetch resumes", error);
      setResumes([]);
    }
  };

  const deleteResume = async (id: number) => {
    try {
      await axiosInstance.delete(`/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting resume", error);
    }
  };

  const downloadResume = (id: number) => {
    navigate(`/download-resume/${id}`);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>

      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => navigate(`/resume/${resume.id}`)}
            >
              <h2 className="text-xl font-semibold group-hover:text-blue-600">{resume.fullName}</h2>
              <p className="text-gray-500 text-sm">{resume.email}</p>
              <p className="mt-2 text-gray-700 text-sm line-clamp-3">{resume.summary}</p>

              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-resume/${resume.id}`);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume.id);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadResume(resume.id);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResumes;
