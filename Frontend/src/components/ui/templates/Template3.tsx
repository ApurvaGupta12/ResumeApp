// Two column layout
import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template3: React.FC<TemplateProps> = ({ data ,showSkillLevel}) => {
  return (
    <div className="flex flex-col w-[210mm] min-h-[297mm] mx-auto bg-white text-gray-800 p-8 shadow-md">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.fullName}</h1>
        <p className="mt-2"><a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a> | {data.phoneNumber} |{data.location}  </p>
        <div className="flex justify-center space-x-4 mt-1 text-blue-600">
          {data.linkedIn && <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {data.gitHub && <a href={data.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data.portFolio && <a href={data.portFolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-8">

        {/* Left Column */}
        <div>
          {/* Summary */}
          {data.summary.trim() && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Summary</h2>
              <p>{data.summary}</p>
            </section>
          )}

          {/* Experience */}
{data.experience.some(
  (exp) =>
    exp.jobTitle?.trim() !== "" ||
    exp.company?.trim() !== "" ||
    exp.location?.trim() !== "" ||
    exp.startDate?.trim() !== "" ||
    exp.endDate?.trim() !== "" ||
    exp.responsibility?.trim() !== ""
) && (
  <section className="mb-6">
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Experience</h2>
    {data.experience
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
          {exp.jobTitle && <h3 className="font-bold">{exp.jobTitle}</h3>}
          {(exp.company || exp.location) && (
            <p className="text-sm text-gray-600">
              {[exp.company, exp.location].filter(Boolean).join(" | ")}
            </p>
          )}
          {(exp.startDate || exp.endDate) && (
            <p className="text-sm text-gray-600">
              {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
            </p>
          )}
          {exp.responsibility && <p>{exp.responsibility}</p>}
        </div>
      ))}
  </section>
)}
          {/* Projects */} 
{data.projects.length > 0 && (
  <section>
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Projects</h2>
    {data.projects.map((proj, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold">{proj.title}</h3>

        {/*  Safe check for technologiesUsed */}
        <p className="text-sm text-gray-600">
          {Array.isArray(proj.technologiesUsed)
            ? proj.technologiesUsed.join(', ')
            : typeof proj.technologiesUsed === 'string'
            ? proj.technologiesUsed
            : ''}
        </p>

        <p>{proj.description}</p>

        {proj.githubLink && (
          <a
            href={proj.githubLink}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    ))}
  </section>
)}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Skills</h2>
              <ul className="list-disc ml-5">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.title}
                   {showSkillLevel && skill.level && ` (${skill.level})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
{data.education.some(
  (edu) =>
    edu.degree?.trim() !== "" ||
    edu.university?.trim() !== "" ||
    edu.location?.trim() !== "" ||
    edu.startDate?.trim() !== "" ||
    edu.endDate?.trim() !== ""
) && (
  <section className="mb-6">
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Education</h2>
    {data.education
      .filter(
        (edu) =>
          edu.degree?.trim() !== "" ||
          edu.university?.trim() !== "" ||
          edu.location?.trim() !== "" ||
          edu.startDate?.trim() !== "" ||
          edu.endDate?.trim() !== ""
      )
      .map((edu, index) => (
        <div key={index} className="mb-2">
          {edu.degree && <h3 className="font-bold">{edu.degree}</h3>}
          {(edu.university || edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm text-gray-600">
              {[edu.university, edu.location, edu.startDate, edu.endDate]
                .filter(Boolean)
                .join(" | ")}
            </p>
          )}
        </div>
      ))}
  </section>
)}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <p>{cert.title} - {cert.issuingOrganization} ({cert.year})</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Achievements</h2>
              {data.achievements.map((ach, index) => (
                <div key={index}>
                  <p>{ach.title} ({ach.year}) - {ach.extraInformation}</p>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Languages</h2>
              <ul className="list-disc ml-5">
                {data.languages.map(lang => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Interests</h2>
              <ul className="list-disc ml-5">
                {data.interests.map(interest => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default Template3;
