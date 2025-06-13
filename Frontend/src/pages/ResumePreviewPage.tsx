import { useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";
import ResumePreview from "@/components/ui/ResumePreview"; 
const ResumePreviewPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const formData = location.state?.formData;
  if (!formData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        Resume data not found. Please go back and fill the form.
      </div>
    );
  }
  
  const templateName = id ? `Template${id}` : "";
  const handleDownloadPDF = async () => {
  const input = document.getElementById("resume-preview");
  if (!input) return;

  try {
    const dataUrl = await domtoimage.toPng(input, {
      quality: 1,
      bgcolor: "#ffffff",
      filter: () => true,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const ratio = img.height / img.width;
      const pdfHeight = pdfWidth * ratio;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.fullName || "resume"}.pdf`);
    };
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};  
   return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
    
      <div
        id="resume-preview"
        className=" p-4 bg-white shadow-lg rounded-lg w-full max-w-[800px]"
        
      >
        <ResumePreview
          templateresume={templateName}
          resumeData={formData}
          showSkillLevel={false}
        />
      </div>

      {/* Button for PDF download */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};



export default ResumePreviewPage;
