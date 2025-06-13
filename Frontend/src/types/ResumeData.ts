export interface ResumeData {
  endDate: Date | null;
  startDate: Date | null;
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    linkedIn?: string | null;
    gitHub?: string | null;
    portFolio?: string | null;
  summary: string;
  skills: { title: string; level: string }[];
  isExperienced: string;
  experience: {
    jobTitle: string;
    company: string;
    location: string;
    startDate?: string;
    endDate?: string;
    responsibility: string;
  }[];
  education: {
    degree: string;
    university: string;
    location: string;
    startDate?: string;
    endDate?: string;
  }[];
  certifications: {
    title: string;
    issuingOrganization: string;
    year: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologiesUsed: string;
    githubLink?: string | null;
  }[];
  achievements: {
    title: string;
    year: string;
    extraInformation: string;
  }[];
  languages: { id: number; name: string }[];
  interests: { id: number; name: string }[];
}
