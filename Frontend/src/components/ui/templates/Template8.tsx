import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';
const Template8: React.FC<TemplateProps> = ({ data,showSkillLevel }) => {
  const {
  fullName,
  email,
  phoneNumber,
  location,
  linkedIn,
  gitHub,
  portFolio,
} = data;
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto flex bg-white text-gray-800 font-sans">

      {/* Sidebar */}
      <div className="w-1/3 bg-indigo-50 p-6 space-y-6">

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Contact</h2>
          {email && <p className="text-sm"> <a
          href={`mailto:${data.email}`}
          className="text-blue-600 underline"
          >
          {data.email}
          </a></p>}
          {phoneNumber && <p className="text-sm">{phoneNumber}</p>}
          {location && <p className="text-sm">{location}</p>}
          {linkedIn && <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm block">LinkedIn</a>}
          {gitHub && <a href={gitHub} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm block">GitHub</a>}
          {portFolio && <a href={portFolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm block">Portfolio</a>}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill.title}{showSkillLevel && skill.level && ` (${skill.level})`}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Languages</h2>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {data.languages.map((lang) => (
                <li key={lang.id}>{lang.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {data.interests.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Interests</h2>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {data.interests.map((interest) => (
                <li key={interest.id}>{interest.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-6">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-4xl font-bold">{fullName}</h1>
        </header>

        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Summary</h2>
            <p className="text-sm">{data.summary}</p>
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
    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Experience</h2>
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
        <div key={index} className="mb-4">
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
    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Projects</h2>
    {data.projects.map((project, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold">{project.title}</h3>
        <p className="text-sm">{project.description}</p>

        {/*  Safe join check for technologiesUsed */}
        {project.technologiesUsed && (
          <p className="text-sm text-gray-500">
            Technologies:{' '}
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
    <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Education</h2>
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
          {edu.degree && <h3 className="font-bold">{edu.degree}</h3>}
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
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Certifications</h2>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert.title} - {cert.issuingOrganization} ({cert.year})</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Achievements</h2>
            {data.achievements.map((ach, index) => (
              <p key={index} className="text-sm">• {ach.title} ({ach.year}) - {ach.extraInformation}</p>
            ))}
          </section>
        )}
      </div>

    </div>
  );
};

export default Template8;
