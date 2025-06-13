import AdminTemplateList from "@/components/ui/AdminTemplateList";
import React from "react";
const TemplatesPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resume Templates</h1>
      <AdminTemplateList />
    </div>
  );
};

export default TemplatesPage;
