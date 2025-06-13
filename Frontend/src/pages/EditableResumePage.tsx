import { useParams ,useNavigate} from "react-router-dom";
import { useForm, useFieldArray} from "react-hook-form";
import { ResumeData } from "../types/ResumeData";
import { styles } from "../formtype/styles"; 

import "../App.css";
import Calendar from "../components/ui/Calender";

import "react-datepicker/dist/react-datepicker.css";
// Import templates
import Template1 from "../components/ui/templates/Template1";
import Template3 from "../components/ui/templates/Template3";

import Template2 from "@/components/ui/templates/Template2";
import Template4 from "@/components/ui/templates/Template4";
import Template6 from "@/components/ui/templates/Template6";

import Template7 from "@/components/ui/templates/Template7";
import Template8 from "@/components/ui/templates/Template8";
import Template9 from "@/components/ui/templates/Template9";
import Template5 from "@/components/ui/templates/Template5";
import { useState } from "react";
import dayjs from "dayjs";

import axiosInstance from "@/api/axiosInstance";
const EditableResumePage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState<"start" | "end" | null>(null);
  const navigate = useNavigate();
  const [projectError, setProjectError] = useState(""); 
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ResumeData>({
    defaultValues: {
      
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        linkedIn: "",
        gitHub: "",
        portFolio: ""
  ,
      summary: "",
      skills: [],
      experience: [
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibility: ""
        }
      ],
      education: [
        {
          degree: "",
          university: "",
          location: "",
          startDate: "",
          endDate: ""
        }
      ],
      certifications: [],
      projects: [],
      achievements: [],
      languages: [],
      interests: []
    }
  });
  const watchedSkills = watch("skills");
  const handleDateSelect = (date: dayjs.Dayjs) => {
    if (selectedDateType === "start") {
      setStartDate(date);
    } else if (selectedDateType === "end") {
      setEndDate(date);
    }
    setShowCalendar(false); // Close the calendar after date selection
  };

  const toggleCalendar = (dateType: "start" | "end") => {
    setSelectedDateType(dateType);
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };
 
  // Dynamic arrays
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: expFields, append: addExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: addEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: certFields, append: addCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });
  const { fields: projectFields, append: addProject, remove: removeProject } = useFieldArray({ control, name: "projects" });
  const { fields: achFields, append: addAch, remove: removeAch } = useFieldArray({ control, name: "achievements" });
  const { fields: langFields, append: addLang, remove: removeLang } = useFieldArray({ control, name: "languages" });
  const { fields: intFields, append: addInt, remove: removeInt } = useFieldArray({ control, name: "interests" });

  const formData = watch();
  const [showSkillLevel, setShowSkillLevel] = useState<boolean>(false);
  const renderSelectedTemplate = () => {
    switch (id) {
      case "1": return <Template1 data={formData} showSkillLevel={showSkillLevel}
      startDate={formData.startDate} 
      endDate={formData.endDate}  />;
      case "2": return <Template2 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate}/>;
      case "3": return <Template3 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate}/>;
      case "4": return <Template4 data={formData} showSkillLevel={showSkillLevel}
      startDate={formData.startDate} 
      endDate={formData.endDate} />;
      case "5": return <Template5 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate} />;
      case "6": return <Template6 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate}/>;
      case "7": return <Template7 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate}/>;
      case "8": return <Template8 data={formData} showSkillLevel={showSkillLevel}
      startDate={formData.startDate} 
      endDate={formData.endDate} />;
      case "9": return <Template9 data={formData} showSkillLevel={showSkillLevel} 
      startDate={formData.startDate} 
      endDate={formData.endDate}/>;
      default: return <div>Template Not Found</div>;
    }
  };
  const onSubmit = async (data: ResumeData) => {
  //  Project Validation
  const filledProjects = data.projects.filter((proj) =>
    proj.title.trim() ||
    proj.description.trim() ||
    proj.technologiesUsed.trim() ||
    proj.githubLink?.trim()
  );

  if (filledProjects.length === 0) {
    setProjectError("At least one project entry is required");
    return; // stop form submission
  }

  setProjectError(""); // Clear error if at least one project is filled
  try {
    const response = await axiosInstance.post("/resumes/create", data);
    if (response.status === 200) {
      console.log(formData);
      console.log("Response Data:", response.data);
      alert("Resume saved successfully!");
      navigate(`/preview/${id}`, { state: { formData: data } });
    } else {
      alert("Failed to save resume");
    }
  } catch (error: any) {
    console.error("Error saving resume:", error);
    if (error.response) {
      console.log("Response data:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request was made but no response received");
      console.log(error.request);
    } else {
      console.log("Error setting up request:", error.message);
    }
    alert("Network Connection error:, Failed to save resume");
  }
};



  return (
    
    <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100 min-h-screen">
      {/* LEFT SIDE - FORM */}
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto p-4">
        <h2 className="text-2xl font-bold text-blue-700">Resume Form</h2>

       {/* Personal Information */}
<h3 className="font-semibold text-2xl">Personal Information</h3>

{/* Full Name */}
<label className="block text-lg font-bold">Full Name</label>
<input
  {...register("fullName", { required: "Full Name is required" })}
  placeholder="Full Name"
  className={styles.input}
/>
{errors.fullName && (
  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
)}

{/* Email */}
<label className="block text-lg font-bold">Email</label>
<input
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  })}
  placeholder="Email"
  className={styles.input}
/>
{errors.email && (
  <p className="text-red-500 text-sm">{errors.email.message}</p>
)}

{/* Phone Number */}
<label className="block text-lg font-bold">Contact</label>
<input
  {...register("phoneNumber", {
    required: "Phone Number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone number must be 10 digits",
    },
  })}
  placeholder="Phone Number"
  className={styles.input}
/>
{errors.phoneNumber && (
  <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
)}

{/* Location */}
<label className="block text-lg font-bold">Location</label>
<input
  {...register("location", { required: "Location is required" })}
  placeholder="Location"
  className={styles.input}
/>
{errors.location && (
  <p className="text-red-500 text-sm">{errors.location.message}</p>
)}

{/* LinkedIn */}
<label className="block text-lg font-bold">LinkedIn</label>
<input
  {...register("linkedIn", {
    pattern: {
      value: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
      message: "Enter a valid LinkedIn URL",
    },
  })}
  placeholder="LinkedIn"
  className={styles.input}
/>
{errors.linkedIn && (
  <p className="text-red-500 text-sm">{errors.linkedIn.message}</p>
)}

{/* GitHub */}
<label className="block text-lg font-bold">GitHub</label>
<input
  {...register("gitHub", {
    pattern: {
      value: /^https:\/\/(www\.)?github\.com\/.+$/,
      message: "Enter a valid GitHub URL",
    },
  })}
  placeholder="GitHub"
  className={styles.input}
/>
{errors.gitHub && (
  <p className="text-red-500 text-sm">{errors.gitHub.message}</p>
)}

{/* Portfolio */}
<label className="block text-lg font-bold">Portfolio</label>
<input
  {...register("portFolio", {
    pattern: {
      value: /^https?:\/\/.+$/,
      message: "Enter a valid Portfolio URL",
    },
  })}
  placeholder="Portfolio"
  className={styles.input}
/>
{errors.portFolio && (
  <p className="text-red-500 text-sm">{errors.portFolio.message}</p>
)}


      {/* Summary */}
<h3 className="font-semibold text-2xl">Summary</h3>
<textarea
  {...register("summary", {
    required: "Summary is required",
    minLength: {
      value: 20,
      message: "Summary must be at least 20 characters",
    },
    maxLength: {
      value: 400,
      message: "Summary cannot exceed 400 characters",
    },
  })}
  placeholder="Professional Summary"
  className={`${styles.input} h-60`}
/>
{errors.summary && (
  <p className="text-red-500 text-sm">{errors.summary.message}</p>
)}
<p>Recruiter tip: write 200-400 characters to increase interview chances</p>

        
        
        {/* Skills */}
       
        <h3 className="font-semibold text-2xl mb-2">Skills</h3>
<p>Add important skills that show you fit the position.</p>
{/* Toggle Button */}
<div className="mb-4 flex items-center gap-3">
  <label className="font-medium text-gray-700">Show Skill Level</label>
  {/* Toggle Switch */}
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={showSkillLevel}
      onChange={() => setShowSkillLevel(!showSkillLevel)}
    />
    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 transition-all duration-300"></div>
    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
  </label>
</div>

<div className="space-y-3">
  {skillFields.map((field, index) => (
    <div key={field.id} className="flex flex-col sm:flex-row items-center gap-3">
      <input
        {...register(`skills.${index}.title`, {
          required: "Skill title is required", // Adding validation for each skill title
        })}
        placeholder="e.g., Java, React, SQL"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSkillLevel && (
        <select
          {...register(`skills.${index}.level`, {
            required: showSkillLevel ? "Skill level is required" : false, // Adding validation for skill level when shown
          })}
          className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      )}
      <button
        type="button"
        onClick={() => removeSkill(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  ))}
</div>

{/* Add skill button */}
<button
  type="button"
  onClick={() => appendSkill({ title: "", level: "" })}
  className={styles.btn}
>
  + Add Skill
</button>

{/* Skills validation error message */}
{watchedSkills.length < 3 && (
  <p className="text-red-500 text-sm">Please add at least 3 skills.</p>
)}
      {/* Experience Section */}
<h3 className="font-semibold text-2xl">Experience</h3>

<label className="font-medium block mb-2">Are you experienced?</label>
<div className="flex gap-4 mb-4">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      value="yes"
      {...register("isExperienced", { required: "Please select an option" })}
    />
    Yes
  </label>
  <label className="flex items-center gap-2">
    <input
      type="radio"
      value="no"
      {...register("isExperienced", { required: "Please select an option" })}
    />
    No
  </label>
</div>
<div  className="border p-6 bg-gray-100 rounded-xl mb-6 shadow-md bg-gray-50 space-y-4">
{expFields.map((field, index) => (
  <div key={field.id} className="grid grid-cols-2 gap-2">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
  {...register(`experience.${index}.jobTitle`, {
    validate: (value) =>
      watch("isExperienced") === "yes"
        ? value?.trim() !== "" || "Job Title is required"
        : true,
  })}
  placeholder="Job Title"
  className={styles.input}
/>
{watch("isExperienced") === "yes" &&
  errors.experience?.[index]?.jobTitle && (
    <span className="text-red-500 text-sm">
      {errors.experience[index].jobTitle.message}
    </span>
)}

    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
      <input
  {...register(`experience.${index}.company`, {
    validate: (value) =>
      watch("isExperienced") === "yes"
        ? value?.trim() !== "" || "Company is required"
        : true,
  })}
  placeholder="Company"
  className={styles.input}
/>
{watch("isExperienced") === "yes" &&
  errors.experience?.[index]?.company && (
    <span className="text-red-500 text-sm">
      {errors.experience[index].company.message}
    </span>
)}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
      <input
  {...register(`experience.${index}.location`, {
    validate: (value) =>
      watch("isExperienced") === "yes"
        ? value?.trim() !== "" || "Location is required"
        : true,
  })}
  placeholder="Location"
  className={styles.input}
/>
{watch("isExperienced") === "yes" &&
  errors.experience?.[index]?.location && (
    <span className="text-red-500 text-sm">
      {errors.experience[index].location.message}
    </span>
)}


    </div>

    {/* Start Date */}
    <div className="mb-4">
      <label className="block text-lg">Start Date</label>
      <input
        type="text"
        value={startDate ? startDate.format("YYYY-MM-DD") : ""}
        readOnly
        className="border p-2 rounded-lg w-full"
        placeholder="Select Start Date"
        onClick={() => toggleCalendar("start")}
      />
    </div>

    {/* End Date */}
    <div className="mb-4">
      <label className="block text-lg">End Date</label>
      <input
        type="text"
        value={endDate ? endDate.format("YYYY-MM-DD") : ""}
        readOnly
        className="border p-2 rounded-lg w-full"
        placeholder="Select End Date"
        onClick={() => toggleCalendar("end")}
      />
    </div>

    {showCalendar && (
      <div className="absolute top-[200px] left-0 z-10">
        <Calendar
          value={selectedDateType === "start" ? startDate : endDate}
          onSelectDate={handleDateSelect}
        />
      </div>
    )}

    {/* Remove Button */}
    <div className="col-span-2">
      <button
        type="button"
        onClick={() => removeExp(index)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  </div>
))}
</div>
{/* Add Experience Button */}
<button
  type="button"
  onClick={() =>
    addExp({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibility: "",
    })
  }
  className={styles.btn}
>
  + Add Experience
</button>
        {/* Other sections like Education, Certifications, Projects, Achievements, Languages, Interests */}
        {/* Education */}
        <h3 className="font-semibold text-2xl mb-2">Education</h3>
<p className="text-sm text-gray-600 mb-4">
  A varied education on your resume sums up the value that your learnings and background will bring to job.
</p>

{eduFields.map((field, index) => ( 
  <div
    key={field.id}
    className="border p-6 bg-gray-100 rounded-xl mb-6 shadow-md bg-gray-50 space-y-4"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Degree */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Degree
        </label>
        <input
          {...register(`education.${index}.degree`)}
          placeholder="e.g. B.Tech in Computer Science"
          className={styles.input}
        />
      </div>

      {/* University */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          University
        </label>
        <input
          {...register(`education.${index}.university`)}
          placeholder="e.g. Delhi University"
          className={styles.input}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          {...register(`education.${index}.location`)}
          placeholder="e.g. New Delhi, India"
          className={styles.input}
        />
      </div>

      {/* Start Date Field */}
      <div className="mb-4">
        <label className="block text-lg">Start Date</label>
        <input
          type="text"
          value={startDate ? startDate.format("YYYY-MM-DD") : ""}
          readOnly
          className="border p-2 rounded-lg w-full"
          placeholder="Select Start Date"
          onClick={() => toggleCalendar("start")}
        />
      </div>

      {/* End Date Field */}
      <div className="mb-4">
        <label className="block text-lg">End Date</label>
        <input
          type="text"
          value={endDate ? endDate.format("YYYY-MM-DD") : ""}
          readOnly
          className="border p-2 rounded-lg w-full"
          placeholder="Select End Date"
          onClick={() => toggleCalendar("end")}
        />
      </div>
      {showCalendar && (
        <div className="absolute top-[200px] left-0 z-10">
          <Calendar
            value={selectedDateType  === "start" ? startDate : endDate}
            onSelectDate={handleDateSelect}
          />
        </div>
      )}
    </div>

    {/* Remove Button */}
    <button
      type="button"
      onClick={() => removeEdu(index)}
      className="text-red-500 hover:underline"
    >
      Remove
    </button>
  </div>
))}

        <button type="button" onClick={() => addEdu({ degree: "", university: "", location: "", startDate: "",endDate:""})} className={styles.btn}>+ Add Education</button>

        {/* Certifications */}
        <h3 className="font-semibold text-2xl">Certifications</h3>
        {certFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-2">
            <input {...register(`certifications.${index}.title`)} placeholder="Title" className={styles.input} />
            <input {...register(`certifications.${index}.issuingOrganization`)} placeholder="Organization" className={styles.input}  />
            <input {...register(`certifications.${index}.year`)} placeholder="Year" className={styles.input}  />
            <button type="button" onClick={() => removeCert(index)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addCert({ title: "", issuingOrganization: "", year: "" })} className={styles.btn}>+ Add Certification</button>

        {/* Projects */}
        <h3 className="font-semibold text-2xl">Projects</h3>
{projectFields.map((field, index) => (
  <div key={field.id} className="space-y-2">
    <input
      {...register(`projects.${index}.title`, {
        required: "Project title is required",
        minLength: {
          value: 3,
          message: "Title must be at least 3 characters",
        },
      })}
      placeholder="Project Title"
      className={styles.input}
    />
    {errors.projects?.[index]?.title && (
      <p className="text-red-500 text-sm">{errors.projects[index].title.message}</p>
    )}

    <textarea
      {...register(`projects.${index}.description`, {
        required: "Description is required",
        minLength: {
          value: 10,
          message: "Description must be at least 10 characters",
        },
      })}
      placeholder="Project Description"
      className={styles.input}
    />
    {errors.projects?.[index]?.description && (
      <p className="text-red-500 text-sm">{errors.projects[index].description.message}</p>
    )}

    <input
      {...register(`projects.${index}.technologiesUsed`, {
        required: "Technologies used is required",
        pattern: {
          value: /^[\w\s]+(,\s*[\w\s]+)*$/,
          message: "Technologies should be comma separated",
        },
      })}
      placeholder="Technologies Used (comma separated)"
      className={styles.input}
    />
    {errors.projects?.[index]?.technologiesUsed && (
      <p className="text-red-500 text-sm">{errors.projects[index].technologiesUsed.message}</p>
    )}

    <input
      {...register(`projects.${index}.githubLink`, {
        pattern: {
          value: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/,
          message: "Enter a valid GitHub link",
        },
      })}
      placeholder="GitHub Link"
      className={styles.input}
    />
    {errors.projects?.[index]?.githubLink && (
      <p className="text-red-500 text-sm">{errors.projects[index].githubLink.message}</p>
    )}

    <button
      type="button"
      onClick={() => removeProject(index)}
      className="text-red-500"
    >
      Remove
    </button>
  </div>
))}
<button
  type="button"
  onClick={() =>
    addProject({ title: "", description: "", technologiesUsed: "", githubLink: "" })
  }
  className={styles.btn}
>
  + Add Project
</button>
{projectError && (
  <p className="text-red-500 text-sm mt-2">{projectError}</p>
)}
        {/* Achievements */}
        <h3 className="font-semibold text-2xl">Achievements</h3>
        {achFields.map((field, index) => (
  <div key={field.id} className="space-y-1">
    <input
      {...register(`achievements.${index}.title`, {
        validate: (value) => {
          if (!value) return true; 
          return value.trim().length >= 3 || "Title must be at least 3 characters";
        },
      })}
      placeholder="Title"
      className={styles.input}
    />
    {errors.achievements?.[index]?.title && (
      <p className="text-red-500 text-sm">{errors.achievements[index].title.message}</p>
    )}

    <input
      {...register(`achievements.${index}.year`, {
        validate: (value) => {
          if (!value) return true; 
          const yearNum = Number(value);
          return (yearNum >= 1900 && yearNum <= 2099) || "Year must be between 1900 and 2099";
        },
      })}
      placeholder="Year"
      className={styles.input}
    />
    {errors.achievements?.[index]?.year && (
      <p className="text-red-500 text-sm">{errors.achievements[index].year.message}</p>
    )}

    <textarea
      {...register(`achievements.${index}.extraInformation`, {
        validate: (value) => {
          if (!value) return true;
          return value.trim().length >= 5 || "Extra Info must be at least 5 characters";
        },
      })}
      placeholder="Extra Info"
      className={styles.input}
    />
    {errors.achievements?.[index]?.extraInformation && (
      <p className="text-red-500 text-sm">{errors.achievements[index].extraInformation.message}</p>
    )}

    <button type="button" onClick={() => removeAch(index)} className="text-red-500">Remove</button>
  </div>
))}

        <button type="button" onClick={() => addAch({ title: "", year: "", extraInformation: "" })} className={styles.btn}>+ Add Achievement</button>

        {/* Languages */}
        <h3 className="font-semibold text-2xl">Languages</h3>
        {langFields.map((field, index) => (
  <div key={field.id} className="grid grid-cols-2 gap-2">
    <input
  type="number"
  {...register(`languages.${index}.id`, {
    valueAsNumber: true, 
    validate: (value) => {
  if (isNaN(value)) return true; 
  return true; 
}

  })}
  placeholder="ID"
  className={styles.input}
/>

    <input
      {...register(`languages.${index}.name`, {
        // optional, 
        validate: (value) =>
          value === "" || value.trim().length >= 2 || "Language name must be at least 2 characters",
      })}
      placeholder="Language"
      className={styles.input}
    />
    {errors.languages?.[index]?.name && (
      <p className="text-red-500 text-sm">{errors.languages[index].name.message}</p>
    )}
    <button type="button" onClick={() => removeLang(index)} className="text-red-500">Remove</button>
  </div>
))}

        <button type="button" onClick={() => addLang({ id: langFields.length + 1, name: "" })} className={styles.btn}>+ Add Language</button>

        {/* Interests */}
<h3 className="font-semibold text-2xl mt-6 mb-4">Interests</h3>

{intFields.map((field, index) => (
  <div key={field.id} className="grid grid-cols-3 gap-3 items-center mb-3">
    <input
      type="number"
      {...register(`interests.${index}.id`, {
        valueAsNumber: true,
        validate: (value) => {
          if (isNaN(value)) return true; 
          return true; 
        },
      })}
      placeholder="ID"
      className={styles.input}
    />

    <input
      {...register(`interests.${index}.name`, {
        validate: (value) =>
          value === "" || value.trim().length >= 2 || "Interest name must be at least 2 characters",
      })}
      placeholder="Interest"
      className={styles.input}
    />
    {errors.interests?.[index]?.name && (
      <p className="text-red-500 text-sm">{errors.interests[index].name.message}</p>
    )}

    <button
      type="button"
      onClick={() => removeInt(index)}
      className="text-red-500 hover:underline"
    >
      Remove
    </button>
  </div>
))}

<button
  type="button"
  onClick={() => addInt({ id: intFields.length + 1, name: "" })}
  className={`${styles.btn} mt-2 mb-8`}
>
  + Add Interest
</button>


{/* Submit Button */}
<div className="mt-7">
  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all duration-300"
  >
    Generate
  </button>
</div>

      </form>

      {/* RIGHT SIDE - TEMPLATE PREVIEW */}
      <div className="w-full p-4 bg-white shadow-lg rounded-lg sticky top-0 h-[120vh] overflow-y-auto">
      {renderSelectedTemplate()}
      </div>

  </div>
  );
};

export default EditableResumePage;
