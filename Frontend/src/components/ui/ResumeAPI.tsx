import  { useEffect, useState } from 'react';

const ResumeAPI = () => {
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    fetch('https://registry.jsonresume.org/johndoe') // Example user, tum apna use kar sakti ho
      .then(response => response.json())
      .then(data => setResumeData(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Resume Template (JSON Resume)</h2>
      {resumeData ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(resumeData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResumeAPI;
