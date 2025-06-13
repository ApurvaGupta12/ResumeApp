import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';

const Template4: React.FC<TemplateProps> = ({ data ,showSkillLevel}) => {
  return (
    <div className="flex w-[210mm] min-h-[297mm] mx-auto bg-white shadow-md">
      
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{data.fullName}</h1>
          {data.email && <p className="text-sm mt-2"> <a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a></p>}
          {data.phoneNumber && <p className="text-sm">{data.phoneNumber}</p>}
          {data.location && <p className="text-sm">{data.location}</p>}
        </div>

        <div className="space-y-4">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Skills</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill.title} {showSkillLevel && skill.level && ` (${skill.level})`}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Languages</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.languages.map(lang => (
                  <li key={lang.id}>{lang.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {data.interests.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Interests</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.interests.map(interest => (
                  <li key={interest.id}>{interest.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Social Links */}
          {(data.linkedIn || data.gitHub || data.portFolio) && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Social Links</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.linkedIn && (
                  <li><a href={data.linkedIn} className="text-blue-500" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                )}
                {data.gitHub && (
                  <li><a href={data.gitHub} className="text-blue-500" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                )}
                {data.portFolio && (
                  <li><a href={data.portFolio} className="text-blue-500" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
                )}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-6">
        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Profile Summary</h2>
            <p className="text-sm">{data.summary}</p>
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
  <section>
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
          {exp.jobTitle && <h3 className="font-bold text-lg">{exp.jobTitle}</h3>}
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
    edu.location?.trim() !== "" ||
    edu.startDate?.trim() !== "" ||
    edu.endDate?.trim() !== ""
) && (
  <section>
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
          {edu.degree && <h3 className="font-bold text-lg">{edu.degree}</h3>}
          {(edu.university || edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm text-gray-600">
              {[edu.university, edu.location].filter(Boolean).join(" | ")}{" "}
              ({[edu.startDate, edu.endDate].filter(Boolean).join(" | ")})
            </p>
          )}
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
        <h3 className="font-bold text-lg">{proj.title}</h3>
        <p className="text-sm">{proj.description}</p>

        {/* Safe check for technologiesUsed */}
        <p className="text-sm text-gray-600">
          Tech:{' '}
          {Array.isArray(proj.technologiesUsed)
            ? proj.technologiesUsed.join(', ')
            : typeof proj.technologiesUsed === 'string'
            ? proj.technologiesUsed
            : ''}
        </p>

        {proj.githubLink && (
          <a
            href={proj.githubLink}
            className="text-blue-500 text-sm"
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
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index}>
                <p className="text-sm">{cert.title} - {cert.issuingOrganization} ({cert.year})</p>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Achievements</h2>
            {data.achievements.map((ach, index) => (
              <div key={index}>
                <p className="text-sm">{ach.title} ({ach.year}) - {ach.extraInformation}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Template4;
