import {  useNavigate } from "react-router-dom";
import ResumeTemplatePreview from "../components/ui/ResumeTemplatePreview";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
interface Template {
  id: string;
  name: string;
  templatePreviewUrl: string;
}

const ResumeTemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const token = localStorage.getItem("token");
  const handleTemplateClick = (templateId: string) => {
    if (!token) {
      navigate("/auth/sign-in");
    } else {
      navigate(`/edit-template/${templateId}`);
    }
  };
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    navigate("/auth/sign-in");
    return;
  }

  const user = JSON.parse(storedUser);
  if (user.role !== "USER") {
    navigate("/unauthorized"); 
  }
}, []);
useEffect(() => {
    const fetchActiveTemplates = async () => {
      try {
        const res = await axiosInstance.get("/templates/active");
        console.log("Templates Response:", res.data);
        setTemplates(res.data); 
      } catch (err) {
        console.error("Active templates fetch error:", err);
        setError("There was a problem loading the templates.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTemplates();
  }, []);
  if (loading) return <div className="text-center mt-10">Templates are loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-peach-100 via-sky-200 to-teal-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-peach-100 via-sky-200 to-teal-100 text-black text-center py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Build Your Dream Resume Today
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-black-100">
            Choose from our professionally designed templates and create a resume that stands out.
          </p>
        </div>
      </section>
 {/* Templates Grid Section */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-12 gap-6 mb-40">
        {templates.map((template) => (
          <div
            key={template.id}
            className="w-full max-w-125 hover:scale-105 transition-transform duration-300"
            onClick={() => handleTemplateClick(template.id)}
          >
            <ResumeTemplatePreview template={template} />
          </div>
        ))}
      </div>

      {/* Footer or Additional Content */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};


export default ResumeTemplatesPage;
