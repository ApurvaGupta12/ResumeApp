import { useState } from 'react';

interface ResumeResult {
  category: string;
  recommended_job: string;
  contact_number: string;
  email: string;
  skills: string[];
  education: string[];
  content: string;
  experience_years?: number;
  education_completed?: boolean;
  certifications?: string[];
}

function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please upload a file first');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Upload Resume and get parsed data
      const uploadResponse = await fetch('http://localhost:5000/api/upload_resume', {
        method: 'POST',
        body: formData,
      });
      const data: ResumeResult = await uploadResponse.json();
      setResult(data);

      // 2. Call scoring API with extracted info from resume
      // Adjust the payload as per your scoring API expectation
      const scoreResponse = await fetch('http://localhost:5000/score_resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: data.skills,
          experience_years: data.experience_years || 0,
          education_completed: data.education_completed || false,
          certifications: data.certifications || [],
          content: data.content || '',
        }),
      });

      const scoreData = await scoreResponse.json();
      setScore(scoreData.score);
      setSuggestions(scoreData.suggestions || []);
    } catch (error) {
      console.error('Error uploading file or scoring:', error);
      alert('Error processing resume');
    } finally {
      setLoading(false);
    }
  };


  // contact number  format  helper function
  const formatContactNumber = (number: string | null) => {
    if (!number) return null;
    if (number.startsWith('91') && !number.startsWith('+91')) {
      return '+' + number;
    }
    return number;
  };   
  return (
    <div className="max-w-4xl mx-auto p-10 bg-gray-50 rounded-2xl shadow-xl mt-16">
      <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        Upload Resume PDF
      </h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full mb-6 text-gray-700 border border-blue-400 rounded-md cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300 ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {result && (
        <div className="mt-14 bg-white p-12 rounded-xl border border-blue-400 shadow-lg">
          <h3 className="text-3xl font-semibold mb-7 text-blue-900 border-b border-blue-600 pb-4">
            Analysis Result
          </h3>
          {/* Score display */}
          {score !== null && (
            <p className="mt-8 text-xl font-bold text-green-700">
              Resume Score: <span className="text-2xl">{score}/100</span>
            </p>
          )}
          <p className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Category:</span> {result.category}
          </p>
          <p className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Recommended Job:</span> {result.recommended_job}
          </p>
          <p className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Contact Number:</span>{' '}
            {formatContactNumber(result.contact_number) || 'Not found'}
          </p>
          <p className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Email:</span> {result.email || 'Not found'}
          </p>

          <div className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Skills:</span>
            {result.skills.length ? (
              <ul className="list-disc list-inside mt-1 ml-5 space-y-1">
                {result.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>Not found</p>
            )}
          </div>

          <p className="mb-5 text-gray-900">
            <span className="font-semibold text-blue-800">Education:</span>{' '}
            {result.education.length ? result.education.join(', ') : 'Not found'}
          </p>
          {suggestions.length > 0 && (
            <div className="mt-10">
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Suggestions to Improve:</h4>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-800">
                {suggestions.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
