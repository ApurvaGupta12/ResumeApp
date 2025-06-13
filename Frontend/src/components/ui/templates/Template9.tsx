import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template9: React.FC<TemplateProps> = ({ data,showSkillLevel }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto p-10 bg-gray-50 text-gray-900 font-sans space-y-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold">{data.fullName}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {data.location && data.location + " | "}
          {data.phoneNumber && data.phoneNumber + " | "}
          <a
          href={`mailto:${data.email}`}
          className="text-blue-600 underline"
          >
          {data.email}
          </a>
        </p>
        <div className="flex justify-center gap-4 mt-2 text-blue-600 text-sm">
          {data.linkedIn && <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {data.gitHub && <a href={data.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data.portFolio && <a href={data.portFolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section>
          <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">Professional Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{skill.title} {showSkillLevel && skill.level && ` (${skill.level})`}</span>
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
    <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-300 pb-1">
      Work Experience
    </h2>
    <div className="relative border-l-2 border-blue-400 ml-4 space-y-6">
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
          <div key={index} className="ml-6 relative">
            <div className="absolute left-[-14px] top-1 w-4 h-4 bg-blue-400 rounded-full"></div>
            {exp.jobTitle && <h3 className="text-lg font-bold">{exp.jobTitle}</h3>}
            {(exp.company || exp.location || exp.startDate || exp.endDate) && (
              <p className="text-sm text-gray-600">
                {[exp.company, exp.location, `${exp.startDate}-${exp.endDate}`]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            )}
            {exp.responsibility && <p className="text-sm mt-1">{exp.responsibility}</p>}
          </div>
        ))}
    </div>
  </section>
)}


      {/* Projects */} 
{data.projects.length > 0 && (
  <section>
    <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">Projects</h2>
    <div className="space-y-4">
      {data.projects.map((project, index) => (
        <div key={index}>
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm">{project.description}</p>
          <p className="text-xs text-gray-500">
            Technologies:{' '}
            {Array.isArray(project.technologiesUsed)
              ? project.technologiesUsed.join(', ')
              : typeof project.technologiesUsed === 'string'
              ? project.technologiesUsed
              : ''}
          </p>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm"
            >
              View Project
            </a>
          )}
        </div>
      ))}
    </div>
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
    <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">
      Education
    </h2>
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
        <div key={index} className="mb-2">
          {edu.degree && <h3 className="font-semibold">{edu.degree}</h3>}
          {(edu.university || edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm">
              {[edu.university, edu.location]
                .filter(Boolean)
                .join(", ")}{" "}
              ({[edu.startDate, edu.endDate].filter(Boolean).join(" | ")})
            </p>
          )}
        </div>
      ))}
  </section>
)}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">Certifications</h2>
          <ul className="list-disc ml-6 text-sm">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert.title} - {cert.issuingOrganization} ({cert.year})</li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2 text-blue-800 border-b-2 border-blue-300 pb-1">Achievements</h2>
          {data.achievements.map((ach, index) => (
            <p key={index} className="text-sm">• {ach.title} ({ach.year}) - {ach.extraInformation}</p>
          ))}
        </section>
      )}

      {/* Languages & Interests */}
      {(data.languages.length > 0 || data.interests.length > 0) && (
        <section className="flex gap-8 mt-6">
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-700">Languages</h2>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {data.languages.map((lang) => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}
          {data.interests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-700">Interests</h2>
              <ul className="list-disc ml-5 text-sm space-y-1">
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

export default Template9;
