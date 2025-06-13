import { ResumeData } from "./ResumeData";

export interface TemplateProps {
  data: ResumeData;
  showSkillLevel: boolean;
  startDate:Date|null;
  endDate:Date|null;
}
