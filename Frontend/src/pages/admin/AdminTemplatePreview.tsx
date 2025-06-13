import Template1 from "@/components/ui/templates/Template1";
import Template2 from "@/components/ui/templates/Template2";
import Template3 from "@/components/ui/templates/Template3";
import Template4 from "@/components/ui/templates/Template4";
import Template5 from "@/components/ui/templates/Template5";
import Template6 from "@/components/ui/templates/Template6";
import Template7 from "@/components/ui/templates/Template7";
import Template8 from "@/components/ui/templates/Template8";
import Template9 from "@/components/ui/templates/Template9";
import { useParams } from "react-router-dom";
import { dummyData } from "@/data/dummyResumeData";

const AdminTemplatePreview = () => {
  const { id } = useParams();

  const commonProps = {
    data: dummyData,
    showSkillLevel: true,
    startDate: dummyData.startDate,
    endDate: dummyData.endDate,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-center text-2xl font-bold mb-6">
         Template {id}
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-4 shadow-xl rounded-lg">
        {id === "1" && <Template1 {...commonProps} />}
        {id === "2" && <Template2 {...commonProps} />}
        {id === "3" && <Template3 {...commonProps} />}
        {id === "4" && <Template4 {...commonProps} />}
        {id === "5" && <Template5 {...commonProps} />}
        {id === "6" && <Template6 {...commonProps} />}
        {id === "7" && <Template7 {...commonProps} />}
        {id === "8" && <Template8 {...commonProps} />}
        {id === "9" && <Template9 {...commonProps} />}
      </div>
    </div>
  );
};

export default AdminTemplatePreview;
