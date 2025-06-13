// src/components/ui/EditableResume.tsx
import React from 'react';

type ResumeProps = {
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
};

const EditableResume: React.FC<ResumeProps> = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { name, value } = e.target;
    setResumeData((prevState: any) => ({
      ...prevState,
      [field]: {
        ...prevState[field as keyof typeof prevState],
        [name]: value,
      },
    }));
  };

  return (
    <div>
      {/* Render editable form fields here */}
      <input
        type="text"
        name="fullName"
        value={resumeData.fullName}
        onChange={(e) => handleInputChange(e, 'personalInformation')}
      />
      {/* Add other form fields */}
    </div>
  );
};

export default EditableResume;
