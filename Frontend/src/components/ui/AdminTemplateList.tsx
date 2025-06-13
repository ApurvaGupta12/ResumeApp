import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

interface Template {
  id: number;
  name: string;
  previewImage: string;
  isActive: boolean;
}

const AdminTemplateList = () => {
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Protect Admin Access
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/auth/sign-in");
    return;
  }

  try {
    const decoded: any = JSON.parse(atob(token.split('.')[1]));
    if (decoded.role !== "ADMIN") {
      navigate("/profile");
    }
  } catch (error) {
    console.error("Token decode failed", error);
    navigate("/auth/sign-in");
  }
}, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/templates/admin/all");
      const backendTemplates = response.data;
      const mappedTemplates: Template[] = backendTemplates.map((template: any) => ({
        id: template.id,
        name: template.name,
        previewImage: template.templatePreviewUrl,
        isActive: template.active,
      }));

      setTemplateList(mappedTemplates);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token"); 
        navigate("/auth/sign-in");
  
      } else {
        setError("There is a problem to loading template");
      }
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTemplateStatus = async (id: number, currentStatus: boolean) => {
    try {
      await axiosInstance.put(`/templates/admin/${id}/status?isActive=${!currentStatus}`);
      setTemplateList((prev) =>
        prev.map((template) =>
          template.id === id
            ? { ...template, isActive: !currentStatus }
            : template
        )
      );
    } catch (err) {
      alert("There is a problem occured to update status ");
      console.error("Toggle error:", err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (loading) return <div className="text-center mt-10">Templates are loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Templates List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templateList.map(({ id, name, previewImage, isActive }) => (
          <div
            key={id}
            className={`border rounded-md p-4 cursor-pointer hover:shadow-md transition ${
              isActive ? "border-green-600" : "border-gray-400"
            }`}
          >
            <img
              src={previewImage}
              alt={name}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className={`mb-3 ${isActive ? "text-green-600" : "text-gray-600"}`}>
              Status: {isActive ? "Active" : "Inactive"}
            </p>
            <button
              onClick={() => toggleTemplateStatus(id, isActive)}
              className={`px-4 py-2 rounded transition ${
                isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {isActive ? "Deactivate" : "Activate"}
            </button>
            {/* Preview Button */}
    <button
      onClick={() => {
    console.log("Preview clicked for template id:", id);
    navigate(`/admin/template-preview/${id}`);
  }}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mt-2 block w-full"
    >
      Preview
    </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTemplateList;
