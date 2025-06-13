import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template7: React.FC<TemplateProps> = ({ data ,showSkillLevel}) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto px-10 py-8 bg-white text-gray-900 font-sans space-y-6">
      {/* Top Section */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">{data.fullName}</h1>
        <p className="text-sm">
        <a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a> | {data.phoneNumber} | {data.location}
        </p>
        <div className="flex justify-center gap-4 text-indigo-600 text-sm">
          {data.linkedIn && <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {data.gitHub && <a href={data.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data.portFolio && <a href={data.portFolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </header>

      {/* Summary */}
      {data.summary.trim() && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Skills</h2>
          <div className="grid grid-cols-2 text-sm gap-y-2">
            {data.skills.map((skill, index) => (
              <div key={index}>• {skill.title} {showSkillLevel && skill.level && ` (${skill.level})`}</div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
{data.experience.some(
  (exp) =>
    exp.jobTitle?.trim() ||
    exp.company?.trim() ||
    exp.location?.trim() ||
    exp.startDate?.trim() ||
    exp.endDate?.trim() ||
    exp.responsibility?.trim()
) && (
  <section>
    <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Experience</h2>
    {data.experience
      .filter(
        (exp) =>
          exp.jobTitle?.trim() ||
          exp.company?.trim() ||
          exp.location?.trim() ||
          exp.startDate?.trim() ||
          exp.endDate?.trim() ||
          exp.responsibility?.trim()
      )
      .map((exp, index) => (
        <div key={index} className="mb-3">
          {exp.jobTitle && <h3 className="font-bold text-lg">{exp.jobTitle}</h3>}
          {(exp.company || exp.location || exp.startDate || exp.endDate) && (
            <p className="text-sm text-gray-600">
              {[exp.company, exp.location, `${exp.startDate}-${exp.endDate}`]
                .filter(Boolean)
                .join(" | ")}
            </p>
          )}
          {exp.responsibility && <p className="text-sm">{exp.responsibility}</p>}
        </div>
      ))}
  </section>
)}
      {/* Projects */} 
{data.projects.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Projects</h2>
    {data.projects.map((project, index) => (
      <div key={index} className="mb-3">
        <h3 className="font-bold">{project.title}</h3>
        <p className="text-sm">{project.description}</p>

        {/*  Safe check before using join */}
        {project.technologiesUsed && (
          <p className="text-sm text-gray-500">
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
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 text-sm"
          >
            GitHub
          </a>
        )}
      </div>
    ))}
  </section>
)}


     {/* Education */}
{data.education.some(
  (edu) =>
    edu.degree?.trim() ||
    edu.university?.trim() ||
    edu.location?.trim() ||
    edu.startDate?.trim() ||
    edu.endDate?.trim()
) && (
  <section>
    <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Education</h2>
    {data.education
      .filter(
        (edu) =>
          edu.degree?.trim() ||
          edu.university?.trim() ||
          edu.location?.trim() ||
          edu.startDate?.trim() ||
          edu.endDate?.trim()
      )
      .map((edu, index) => (
        <div key={index} className="mb-3">
          {edu.degree && <h3 className="font-bold">{edu.degree}</h3>}
          {(edu.university || edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm">
              {[edu.university, edu.location]
                .filter(Boolean)
                .join(", ")}{" "}
              ({[edu.startDate, edu.endDate].filter(Boolean).join(", ")})
            </p>
          )}
        </div>
      ))}
  </section>
)}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Certifications</h2>
          <ul className="list-disc ml-5 text-sm">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert.title} - {cert.issuingOrganization} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Achievements</h2>
          {data.achievements.map((ach, index) => (
            <div key={index} className="text-sm mb-1">
              • {ach.title} ({ach.year}) - {ach.extraInformation}
            </div>
          ))}
        </section>
      )}

      {/* Languages & Interests */}
      {(data.languages.length > 0 || data.interests.length > 0) && (
        <section className="grid grid-cols-2 gap-4">
          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Languages</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.languages.map((lang) => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b pb-1 mb-2 text-indigo-700">Interests</h2>
              <ul className="list-disc ml-5 text-sm">
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

export default Template7;
