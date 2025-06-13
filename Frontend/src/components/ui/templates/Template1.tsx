import React from 'react';


import { TemplateProps } from '@/types/TemplateProps';

const Template1: React.FC<TemplateProps> = ({ data ,showSkillLevel}) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{data.fullName}</h1>
        <p className="text-lg text-gray-600">
          {data.location} | {data.phoneNumber} | <a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a>
        </p>
        <div className="flex justify-center gap-4 mt-2 text-blue-600">
          {data.linkedIn && (
            <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
          {data.gitHub && (
            <a href={data.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {data.portFolio && (
            <a href={data.portFolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary?.trim() && (
        <section>
          <h2 className="text-2xl font-semibold text-blue-800">Professional Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
    {data.skills.length > 0 && (
  <section>
    <h2 className="text-2xl font-semibold text-blue-800">Skills</h2>
    <div className="flex flex-wrap gap-3 text-sm">
      {data.skills.map((skill, index) => (
        <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          {skill.title}
          {showSkillLevel && skill.level && ` (${skill.level})`}
        </span>
      ))}
    </div>
  </section>
)}  

      {/* Work Experience */}
{data.experience.some(
  (exp) =>
    exp.jobTitle?.trim() !== "" ||
    exp.company?.trim() !== "" ||
    exp.startDate?.trim() !== "" ||
    exp.endDate?.trim() !== "" ||
    exp.location?.trim() !== "" ||
    exp.responsibility?.trim() !== ""
) && (
  <section>
    <h2 className="text-2xl font-semibold text-blue-800">Work Experience</h2>
    {data.experience
      .filter(
        (exp) =>
          exp.jobTitle?.trim() !== "" ||
          exp.company?.trim() !== "" ||
          exp.startDate?.trim() !== "" ||
          exp.endDate?.trim() !== "" ||
          exp.location?.trim() !== "" ||
          exp.responsibility?.trim() !== ""
      )
      .map((exp, index) => (
        <div key={index} className="mb-4">
          {(exp.jobTitle || exp.company) && (
            <h3 className="font-bold text-lg">
              {exp.jobTitle} {exp.company}
            </h3>
          )}
          {(exp.location || exp.startDate || exp.endDate) && (
            <p className="text-sm text-gray-600">
              {exp.location} | {exp.startDate} - {exp.endDate}
            </p>
          )}
          {exp.responsibility && <p className="text-sm">{exp.responsibility}</p>}
        </div>
      ))}
  </section>
)}

{/* Education */}
{data.education.some(
  (edu) =>
    edu.degree?.trim() !== "" ||
    edu.university?.trim() !== "" ||
    edu.startDate?.trim() !== "" ||
    edu.endDate?.trim() !== "" ||
    edu.location?.trim() !== ""
) && (
  <section>
    <h2 className="text-2xl font-semibold text-blue-800">Education</h2>
    {data.education
      .filter(
        (edu) =>
          edu.degree?.trim() !== "" ||
          edu.university?.trim() !== "" ||
          edu.startDate?.trim() !== "" ||
          edu.endDate?.trim() !== "" ||
          edu.location?.trim() !== ""
      )
      .map((edu, index) => (
        <div key={index} className="mb-4">
          {(edu.degree || edu.university) && (
            <h3 className="font-bold">{edu.degree} - {edu.university}</h3>
          )}
          {(edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm">
              {edu.university && edu.location && `${edu.location} | `}{edu.startDate} - {edu.endDate}
            </p>
          )}
        </div>
      ))}
  </section>
)}


      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-blue-800">Certifications</h2>
          <ul className="list-disc ml-6 text-sm">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert.title} - {cert.issuingOrganization} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-blue-800">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
              {project.technologiesUsed && (
  <p className="text-xs text-gray-500">
    Technologies: {Array.isArray(project.technologiesUsed)
      ? project.technologiesUsed.join(', ')
      : project.technologiesUsed}
  </p>
)}

              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-blue-800">Achievements</h2>
          {data.achievements.map((ach, index) => (
            <p key={index} className="text-sm">
              • {ach.title} ({ach.year}) - {ach.extraInformation}
            </p>
          ))}
        </section>
      )}

      {/* Languages & Interests */}
      {(data.languages.length > 0 || data.interests.length > 0) && (
        <section className="flex flex-col md:flex-row gap-8">
          {data.languages.length > 0 && (
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-700">Languages</h2>
              <ul className="list-disc ml-6 text-sm">
                {data.languages.map((lang) => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}
          {data.interests.length > 0 && (
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-700">Interests</h2>
              <ul className="list-disc ml-6 text-sm">
                {data.interests.map((interest) => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Template1;
