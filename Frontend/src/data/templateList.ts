
import Template1 from "@/components/ui/templates/Template1";
import Template2 from "@/components/ui/templates/Template2";
import Template3 from "@/components/ui/templates/Template3";
import Template4 from "@/components/ui/templates/Template4";
import Template5 from "@/components/ui/templates/Template5";
import Template6 from "@/components/ui/templates/Template6";
import Template7 from "@/components/ui/templates/Template7";
import Template8 from "@/components/ui/templates/Template8";
import Template9 from "@/components/ui/templates/Template9";
import { TemplateProps } from "@/types/TemplateProps";

export type ResumeTemplate = {
  id: number;
  name: string;
  component: React.FC<TemplateProps>;
  previewImage: string;
  isActive: boolean;
};

export const templates: ResumeTemplate[] = [
  {
    id: 1,
    name: "Template1",
    component: Template1,
    previewImage: "/Templates/Temp1.jpeg",
    isActive: true,
  },
  {
    id: 2,
    name: "Template2",
    component: Template2,
    previewImage: "/Templates/Temp2.jpeg",
    isActive: true,
  },
  {
    id: 3,
    name: "Template3",
    component: Template3,
    previewImage: "/Templates/Temp3.jpeg",
    isActive: true,
  },
  {
    id: 4,
    name: "Template4",
    component: Template4,
    previewImage: "/Templates/Temp4.jpeg",
    isActive: true,
  },
  {
    id: 5,
    name: "Template5",
    component: Template5,
    previewImage: "/Templates/Temp5.jpeg",
    isActive: true,
  },
  {
    id: 6,
    name: "Template6",
    component: Template6,
    previewImage: "/Templates/Temp6.jpeg",
    isActive: true,
  },
  {
    id: 7,
    name: "Template7",
    component: Template7,
    previewImage: "/Templates/Temp7.jpeg",
    isActive: true,
  },
  {
    id: 8,
    name: "Template8",
    component: Template8,
    previewImage: "/Templates/Temp8.jpeg",
    isActive: true,
  },
  {
    id: 9,
    name: "Template9",
    component: Template9,
    previewImage: "/Templates/Temp9.jpeg",
    isActive: true,
  },
];
