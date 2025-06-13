// Template 2
import React from 'react';
import { TemplateProps } from '@/types/TemplateProps';


const Template2: React.FC<TemplateProps> = ({ data,showSkillLevel }) => {
  const { fullName,phoneNumber,location, linkedIn,gitHub,portFolio,summary, skills, experience, education, certifications, projects, languages, interests } = data;

  return (
    <div className="flex flex-nowrap w-full max-w-[794px] min-h-[1123px] mx-auto bg-gray-100 shadow-lg">      
      {/* Left Sidebar */}
      <div className="w-1/3 bg-blue-900 text-white p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{fullName}</h1>
          <p className="mt-2">
          <a
    href={`mailto:${data.email}`}
    className="text-blue-600 underline"
  >
    {data.email}
  </a>
          </p>
          <p>{phoneNumber}</p>
          <p>{location}</p>
          
          {/* Optional Links */}
          {linkedIn && (
            <p>
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="underline">
                LinkedIn
              </a>
            </p>
          )}
          {gitHub && (
            <p>
              <a href={gitHub} target="_blank" rel="noopener noreferrer" className="underline">
                GitHub
              </a>
            </p>
          )}
          {portFolio && (
            <p>
              <a href={portFolio} target="_blank" rel="noopener noreferrer" className="underline">
                Portfolio
              </a>
            </p>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-white pb-1 mb-2">Skills</h2>
            <ul className="list-disc ml-4">
              {skills.map((skill, index) => (
                <li key={index}>{skill.title}
                {showSkillLevel && skill.level && ` (${skill.level})`}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Achievements */}
      { data.achievements.length > 0 && (
        <section className="mb-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Achievements</h2>
        {data.achievements.map((achievement, index) => (
         <div key={index}>
          <h3 className="font-semibold">{achievement.title} ({achievement.year})</h3>
          <p className="text-sm text-gray-700">{achievement.extraInformation}</p>
          </div>
        ))}
      </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold border-b border-white pb-1 mb-2">Languages</h2>
            <ul className="list-disc ml-4">
              {languages.map(lang => (
                <li key={lang.id}>{lang.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b border-white pb-1 mb-2">Interests</h2>
            <ul className="list-disc ml-4">
              {interests.map(interest => (
                <li key={interest.id}>{interest.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Profile Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.some(
  (exp) =>
    (exp.jobTitle && exp.jobTitle.trim() !== "") ||
    (exp.company && exp.company.trim() !== "") ||
    (exp.startDate && exp.startDate.trim() !== "") ||
    (exp.endDate && exp.endDate.trim() !== "") ||
    (exp.location && exp.location.trim() !== "") ||
    (exp.responsibility && exp.responsibility.trim() !== "")
) && (
  <section className="mb-6">
    <h2 className="text-2xl font-bold text-blue-900 mb-2">Experience</h2>
    {experience
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
            <h3 className="font-semibold">
              {exp.jobTitle} - {exp.company}
            </h3>
          )}
          {(exp.startDate || exp.endDate || exp.location) && (
            <p className="text-sm text-gray-700">
              {exp.location} | {exp.startDate} - {exp.endDate}
            </p>
          )}
          {exp.responsibility && <p>{exp.responsibility}</p>}
        </div>
      ))}
  </section>
)}
{/* Projects */} 
{projects.length > 0 && (
  <section className="mb-6">
    <h2 className="text-2xl font-bold text-blue-900 mb-2">Projects</h2>
    {projects.map((proj, index) => (
      <div key={index} className="mb-2">
        <h3 className="font-semibold">{proj.title}</h3>

        {/*  Safe check before join */}
        <p className="text-sm text-gray-700">
          {Array.isArray(proj.technologiesUsed)
            ? proj.technologiesUsed.join(', ')
            : proj.technologiesUsed || ''}
        </p>

        <p>{proj.description}</p>

        {proj.githubLink && (
          <a
            href={proj.githubLink}
            className="text-blue-600 underline"
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


{/* Education */}
{education.some(
  (edu) =>
    (edu.degree && edu.degree.trim() !== "") ||
    (edu.university && edu.university.trim() !== "") ||
    (edu.startDate && edu.startDate.trim() !== "") ||
    (edu.endDate && edu.endDate.trim() !== "") ||
    (edu.location && edu.location.trim() !== "")
) && (
  <section className="mb-6">
    <h2 className="text-2xl font-bold text-blue-900 mb-2">Education</h2>
    {education
      .filter(
        (edu) =>
          edu.degree?.trim() !== "" ||
          edu.university?.trim() !== "" ||
          edu.startDate?.trim() !== "" ||
          edu.endDate?.trim() !== "" ||
          edu.location?.trim() !== ""
      )
      .map((edu, index) => (
        <div key={index} className="mb-2">
          {(edu.degree || edu.university) && (
            <h3 className="font-semibold">
              {edu.degree} - {edu.university}
            </h3>
          )}
          {(edu.location || edu.startDate || edu.endDate) && (
            <p className="text-sm text-gray-700">
              {edu.location} | {edu.startDate} - {edu.endDate}
            </p>
          )}
        </div>
      ))}
  </section>
)}
        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index}>
                <p>{cert.title} - {cert.issuingOrganization} ({cert.year})</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Template2;
