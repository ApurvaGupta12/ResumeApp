import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template5: React.FC<TemplateProps> = ({ data ,showSkillLevel}) => {
  const { fullName,email,phoneNumber,location,linkedIn,gitHub,portFolio, summary, skills, experience, education, certifications, projects, achievements, languages, interests } = data;

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto p-10 bg-white shadow-lg space-y-8">

      {/* Header */}
      <header className="text-center">
  <h1 className="text-4xl font-bold text-gray-900">{fullName}</h1>
  
  <p className="text-gray-600 text-sm">
    {email && (
      <a href={`mailto:${email}`} className="text-blue-600 underline mr-2">
        {email}
      </a>
    )}
    {phoneNumber && `| ${phoneNumber} `}
    {location && `| ${location}`}
  </p>

  <p className="text-gray-600 text-sm mt-1">
    {linkedIn && (
      <a href={linkedIn} className="text-blue-600 underline mr-2" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
    )}
    {gitHub && (
      <a href={gitHub} className="text-blue-600 underline mr-2" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    )}
    {portFolio && (
      <a href={portFolio} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
        Portfolio
      </a>
    )}
  </p>
</header>

      {/* Summary */}
      {summary && (
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2 border-b pb-1">Profile Summary</h2>
          <p className="text-gray-700 text-sm">{summary}</p>
        </section>
      )}

      {/* Timeline Sections */}
      <div className="relative border-l-2 border-indigo-300 pl-6 space-y-8">

        {/* Experience */}
        {experience?.some(exp =>
  exp.jobTitle || exp.company || exp.location || exp.startDate || exp.endDate || exp.responsibility
) && (
  <section>
    <h2 className="text-xl font-semibold text-indigo-700 mb-2">Experience</h2>
    {experience.map((exp, index) => {
      const hasAnyField = exp.jobTitle || exp.company || exp.location || exp.startDate || exp.endDate || exp.responsibility;
      return hasAnyField ? (
        <div key={index} className="mb-6 relative">
          <div className="absolute w-3 h-3 bg-indigo-700 rounded-full left-[-9px] top-1"></div>
          {exp.jobTitle && <h3 className="text-lg font-bold">{exp.jobTitle}</h3>}
          {(exp.company || exp.location) && (
            <p className="text-gray-600 text-sm">
              {[exp.company, exp.location].filter(Boolean).join(" - ")}
            </p>
          )}
          {(exp.startDate || exp.endDate) && (
            <p className="text-gray-500 text-sm">
              {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
            </p>
          )}
          {exp.responsibility && <p className="text-sm">{exp.responsibility}</p>}
        </div>
      ) : null;
    })}
  </section>
)}



        {/* Education */}
        {education?.some(edu =>
  edu.degree || edu.university || edu.location || edu.startDate || edu.endDate
) && (
  <section>
    <h2 className="text-xl font-semibold text-indigo-700 mb-2">Education</h2>
    {education.map((edu, index) => {
      const hasAnyField = edu.degree || edu.university || edu.location || edu.startDate || edu.endDate;
      return hasAnyField ? (
        <div key={index} className="mb-6 relative">
          <div className="absolute w-3 h-3 bg-indigo-700 rounded-full left-[-9px] top-1"></div>
          {edu.degree && <h3 className="text-lg font-bold">{edu.degree}</h3>}
          {(edu.university || edu.location) && (
            <p className="text-gray-600 text-sm">
              {[edu.university, edu.location].filter(Boolean).join(" - ")}
            </p>
          )}
          {(edu.startDate || edu.endDate) && (
            <p className="text-gray-500 text-sm">
              {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
            </p>
          )}
        </div>
      ) : null;
    })}
  </section>
)}
        {/* Projects */} 
{projects?.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold text-indigo-700 mb-2">Projects</h2>
    {projects.map((proj, index) => (
      <div key={index} className="mb-6 relative">
        <div className="absolute w-3 h-3 bg-indigo-700 rounded-full left-[-9px] top-1"></div>

        {proj.title && <h3 className="text-lg font-bold">{proj.title}</h3>}
        {proj.description && <p className="text-sm">{proj.description}</p>}

        {/* ✅ Safe join check for technologiesUsed */}
        {proj.technologiesUsed && (
          <p className="text-gray-600 text-sm">
            Tech Stack:{' '}
            {Array.isArray(proj.technologiesUsed)
              ? proj.technologiesUsed.join(', ')
              : typeof proj.technologiesUsed === 'string'
              ? proj.technologiesUsed
              : ''}
          </p>
        )}

        {proj.githubLink && (
          <a
            href={proj.githubLink}
            className="text-indigo-600 text-sm"
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
        {/* Certifications */}
        {certifications?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute w-3 h-3 bg-indigo-700 rounded-full left-[-9px] top-1"></div>
                <p className="text-sm">
                  {[cert.title, cert.issuingOrganization].filter(Boolean).join(" - ")}
                  {cert.year ? ` (${cert.year})` : ""}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Achievements</h2>
            {achievements.map((ach, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute w-3 h-3 bg-indigo-700 rounded-full left-[-9px] top-1"></div>
                <p className="text-sm">
                  {ach.title}
                  {ach.year ? ` (${ach.year})` : ""}
                  {ach.extraInformation ? ` - ${ach.extraInformation}` : ""}
                </p>
              </div>
            ))}
          </section>
        )}

      </div>

      {/* Skills, Languages, Interests */}
      {(skills?.length > 0 || languages?.length > 0 || interests?.length > 0) && (
        <div className="grid grid-cols-3 gap-6 pt-8 border-t">
          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">Skills</h2>
              <ul className="list-disc ml-5 text-sm">
                {skills.map((skill, index) => (
                  <li key={index}>
                    {skill.title}
                    {showSkillLevel && skill.level && ` (${skill.level})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">Languages</h2>
              <ul className="list-disc ml-5 text-sm">
                {languages.map(lang => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests */}
          {interests?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">Interests</h2>
              <ul className="list-disc ml-5 text-sm">
                {interests.map(interest => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    </div>
  );
};


export default Template5;
