import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ResumeData } from "@/types/ResumeData";

const UserResumePage = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/api/resumes${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching resume", error);
      }
    };
    fetchResume();
  }, [id]);

  const handleDownload = () => {
    // Placeholder for PDF download functionality
    console.log("Download PDF functionality to be implemented");
  };

  if (!resume) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{resume.fullName}</h1>
          <p className="text-lg text-gray-500">{resume.email}</p>
          <p className="text-lg text-gray-500">{resume.phoneNumber}</p>
          <p className="text-lg text-gray-500">{resume.location}</p>
          <div className="mt-4">
            {resume.linkedIn && <a href={resume.linkedIn} className="text-blue-500">LinkedIn</a>}
            {resume.gitHub && <a href={resume.gitHub} className="text-blue-500 ml-2">GitHub</a>}
            {resume.portFolio && <a href={resume.portFolio} className="text-blue-500 ml-2">Portfolio</a>}
          </div>
          <p className="mt-4 text-sm text-gray-600">{resume.summary}</p>
        </div>

        {/* Skills Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="list-disc ml-8">
            {resume.skills.map((skill, index) => (
              <li key={index}>{`${skill.title} (${skill.level})`}</li>
            ))}
          </ul>
        </section>

        {/* Experience Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Experience</h2>
          <ul className="list-disc ml-8">
            {resume.experience.map((exp, index) => (
              <li key={index}>
                <strong>{exp.jobTitle}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
                <p>{exp.responsibility}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Education Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Education</h2>
          <ul className="list-disc ml-8">
            {resume.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> from {edu.university} ({edu.startDate} - {edu.endDate})
              </li>
            ))}
          </ul>
        </section>

        {/* Certifications Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <ul className="list-disc ml-8">
            {resume.certifications.map((cert, index) => (
              <li key={index}>
                <strong>{cert.title}</strong> from {cert.issuingOrganization} ({cert.year})
              </li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Projects</h2>
          <ul className="list-disc ml-8">
            {resume.projects.map((proj, index) => (
              <li key={index}>
                <strong>{proj.title}</strong> - {proj.description}
                {proj.githubLink && <a href={proj.githubLink} className="text-blue-500 ml-2">GitHub</a>}
              </li>
            ))}
          </ul>
        </section>

        {/* Achievements Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Achievements</h2>
          <ul className="list-disc ml-8">
            {resume.achievements.map((ach, index) => (
              <li key={index}>
                <strong>{ach.title}</strong> ({ach.year}) - {ach.extraInformation}
              </li>
            ))}
          </ul>
        </section>

        {/* Languages Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Languages</h2>
          <ul className="list-disc ml-8">
            {resume.languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </section>

        {/* Interests Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Interests</h2>
          <ul className="list-disc ml-8">
            {resume.interests.map((int, index) => (
              <li key={index}>{int.name}</li>
            ))}
          </ul>
        </section>

        {/* Download Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Resume (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserResumePage;
