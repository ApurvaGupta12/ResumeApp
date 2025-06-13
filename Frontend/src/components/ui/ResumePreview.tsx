import { templateComponents } from "@/utils/templateMapping";
import { TemplateProps } from "@/types/TemplateProps";

interface PreviewProps {
  templateresume: string; 
  resumeData: TemplateProps["data"];
  showSkillLevel?: boolean;
}

const ResumePreview: React.FC<PreviewProps> = ({
 templateresume,
  resumeData,
  showSkillLevel = true,
}) => {
  const SelectedTemplate = templateComponents[templateresume];

  if (!SelectedTemplate) {
    return <p className="text-red-500">Template not found: {templateresume}</p>;
  }

  return (
    <SelectedTemplate
      data={resumeData}
      showSkillLevel={showSkillLevel}
      startDate={null}
      endDate={null}
    />
  );
};

export default ResumePreview;
