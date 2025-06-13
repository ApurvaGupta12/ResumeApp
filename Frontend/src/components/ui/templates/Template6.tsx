import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template6: React.FC<TemplateProps> = ({ data,showSkillLevel }) => {
  const {
    fullName,
    // email,
    phoneNumber,
     location,
    linkedIn,
    gitHub, 
    portFolio,
   
    summary,
    skills,
    experience,
    education,
    certifications,
    projects,
    achievements,
    languages,
    interests
  } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto p-8 bg-white text-gray-800 space-y-6">

      {/* Top Header */}
      <div className="flex flex-col items-center text-center space-y-2">
        <h1 className="text-5xl font-bold text-indigo-900">{fullName}</h1>
        <p className="text-gray-600">
        <a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a> | {phoneNumber} | {location}
        </p>
        <div className="flex space-x-4 text-indigo-700 text-sm">
          {linkedIn && <a href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {gitHub && <a href={gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {portFolio && <a href={portFolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-indigo-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* 2-Column Layout */}
      <div className="grid grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="col-span-1 space-y-6">

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-indigo-300 pb-1 mb-2">Skills</h2>
              <ul className="list-disc ml-5 text-sm">
                {skills.map((skill, index) => (
                  <li key={index}>{skill.title} {showSkillLevel && skill.level && ` (${skill.level})`}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-indigo-300 pb-1 mb-2">Certifications</h2>
              <ul className="list-disc ml-5 text-sm">
                {certifications.map((cert, index) => (
                  <li key={index}>{cert.title} ({cert.year})</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-indigo-300 pb-1 mb-2">Languages</h2>
              <ul className="list-disc ml-5 text-sm">
                {languages.map((lang) => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b border-indigo-300 pb-1 mb-2">Interests</h2>
              <ul className="list-disc ml-5 text-sm">
                {interests.map((interest) => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">

          {/* Experience */}
{experience.some(
  (exp) =>
    exp.jobTitle?.trim() !== "" ||
    exp.company?.trim() !== "" ||
    exp.location?.trim() !== "" ||
    exp.startDate?.trim() !== "" ||
    exp.endDate?.trim() !== "" ||
    exp.responsibility?.trim() !== ""
) && (
  <div>
    <h2 className="text-xl font-semibold border-b-2 border-indigo-300 pb-1 mb-2">Work Experience</h2>
    {experience
      .filter(
        (exp) =>
          exp.jobTitle?.trim() !== "" ||
          exp.company?.trim() !== "" ||
          exp.location?.trim() !== "" ||
          exp.startDate?.trim() !== "" ||
          exp.endDate?.trim() !== "" ||
          exp.responsibility?.trim() !== ""
      )
      .map((exp, index) => (
        <div key={index} className="mb-4">
          {exp.jobTitle && <h3 className="text-lg font-bold">{exp.jobTitle}</h3>}
          {(exp.company || exp.location) && (
            <p className="text-sm text-gray-600">
              {[exp.company, exp.location].filter(Boolean).join(" | ")}
            </p>
          )}
          {(exp.startDate || exp.endDate) && (
            <p className="text-sm text-gray-500">
              {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
            </p>
          )}
          {exp.responsibility && <p className="text-sm">{exp.responsibility}</p>}
        </div>
      ))}
  </div>
)}
{/* Projects */} 
{projects.length > 0 && (
  <div>
    <h2 className="text-xl font-semibold border-b-2 border-indigo-300 pb-1 mb-2">Projects</h2>
    {projects.map((project, index) => (
      <div key={index} className="mb-4">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm">{project.description}</p>

        {/*  Safe technologiesUsed join check */}
        {project.technologiesUsed && (
          <p className="text-sm text-gray-600">
            Tech Stack:{' '}
            {Array.isArray(project.technologiesUsed)
              ? project.technologiesUsed.join(', ')
              : typeof project.technologiesUsed === 'string'
              ? project.technologiesUsed
              : ''}
          </p>
        )}

        {project.githubLink && (
          <a
            href={project.githubLink}
            className="text-indigo-600 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    ))}
  </div>
)}

          {/* Education */}
{education.some(
  (edu) =>
    edu.degree?.trim() !== "" ||
    edu.university?.trim() !== "" ||
    edu.location?.trim() !== "" ||
    edu.startDate?.trim() !== "" ||
    edu.endDate?.trim() !== ""
) && (
  <div>
    <h2 className="text-xl font-semibold border-b-2 border-indigo-300 pb-1 mb-2">Education</h2>
    {education
      .filter(
        (edu) =>
          edu.degree?.trim() !== "" ||
          edu.university?.trim() !== "" ||
          edu.location?.trim() !== "" ||
          edu.startDate?.trim() !== "" ||
          edu.endDate?.trim() !== ""
      )
      .map((edu, index) => (
        <div key={index} className="mb-4">
          {edu.degree && <h3 className="text-lg font-bold">{edu.degree}</h3>}
          {(edu.university || edu.location) && (
            <p className="text-sm">
              {[edu.university, edu.location].filter(Boolean).join(" - ")}
            </p>
          )}
          {(edu.startDate || edu.endDate) && (
            <p className="text-sm text-gray-500">
              Graduation Year: {[edu.startDate, edu.endDate].filter(Boolean).join(" | ")}
            </p>
          )}
        </div>
      ))}
  </div>
)}
          {/* Achievements */}
          {achievements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b-2 border-indigo-300 pb-1 mb-2">Achievements</h2>
              {achievements.map((ach, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm">{ach.title} ({ach.year}) - {ach.extraInformation}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Template6;
