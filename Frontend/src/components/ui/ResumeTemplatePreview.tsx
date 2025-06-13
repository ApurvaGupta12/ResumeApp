// File: ResumeTemplatePreview.tsx
import React from "react";

type ResumeTemplatePreviewProps = {
  template: {
    id: string;
    name: string;
    templatePreviewUrl: string;
  };
};

const ResumeTemplatePreview: React.FC<ResumeTemplatePreviewProps> = ({ template }) => {
  return (
    
    <div className="border rounded-xl overflow-hidden shadow-lg bg-white">
      <img
        src={template.templatePreviewUrl}
        alt={template.name}
        className=" w-[500px] h-[600px] object-contain" // uniform size
      />
      <div className="p-4 text-center">
        <h2 className="font-semibold text-lg">{template.name}</h2>
      </div>
    </div>
  );
};

export default ResumeTemplatePreview;