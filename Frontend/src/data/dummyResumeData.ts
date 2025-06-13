import { ResumeData } from "@/types/ResumeData";

export const dummyData: ResumeData = {
  id: 1,
  fullName: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  phoneNumber: "+91 9876543210",
  location: "Delhi, India",
  linkedIn: "https://linkedin.com/in/ananyasharma",
  gitHub: "https://github.com/ananyasharma",
  portFolio: "https://ananyaportfolio.com",
  summary: "Motivated and detail-oriented software engineer with 3+ years of experience in full-stack development.",
  skills: [
    { title: "JavaScript", level: "Advanced" },
    { title: "React", level: "Advanced" },
    { title: "Node.js", level: "Intermediate" },
    { title: "TypeScript", level: "Intermediate" },
  ],
  isExperienced: "Yes",
  experience: [
    {
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Pvt. Ltd.",
      location: "Gurgaon, India",
      startDate: "2021-06-01",
      endDate: "2024-01-31",
      responsibility: "Developed and maintained frontend interfaces using React and Redux.",
    },
    {
      jobTitle: "Intern - Web Developer",
      company: "Code Studio",
      location: "Remote",
      startDate: "2020-01-01",
      endDate: "2020-06-30",
      responsibility: "Built responsive components using HTML, CSS, and JavaScript.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      university: "Delhi Technological University",
      location: "Delhi",
      startDate: "2016-08-01",
      endDate: "2020-06-01",
    },
  ],
  certifications: [
    {
      title: "Full Stack Web Development",
      issuingOrganization: "Coursera",
      year: "2021",
    },
  ],
  projects: [
    {
      title: "Resume Builder App",
      description: "Built a dynamic resume builder using React, Tailwind, and TypeScript.",
      technologiesUsed: ["React", "Tailwind", "TypeScript", "Vite"],
      githubLink: "https://github.com/ananyasharma/resume-builder",
    },
    {
      title: "E-Commerce Platform",
      description: "Developed a complete MERN stack e-commerce application with payment integration.",
      technologiesUsed: ["MongoDB", "Express", "React", "Node.js"],
    },
  ],
  achievements: [
    {
      title: "Top Performer - Final Year Project",
      year: "2020",
      extraInformation: "Developed an AI chatbot for mental health support using Python and ML.",
    },
  ],
  languages: [
    { id: 1, name: "English" },
    { id: 2, name: "Hindi" },
  ],
  interests: [
    { id: 1, name: "Reading" },
    { id: 2, name: "Open Source Contribution" },
  ],
  startDate: new Date("2020-01-01"),
  endDate: new Date("2024-01-01"),
};
