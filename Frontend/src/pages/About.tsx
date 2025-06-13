

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 bg-indigo-600 text-white px-4">
        <h1 className="text-4xl font-bold">Resume Builder & Screening Assistant</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Create professional resumes and get AI-powered job screening insights in minutes!
        </p>
      </section>

      {/* Overview */}
      <section className="py-12 px-6 md:px-24">
        <h2 className="text-2xl font-semibold text-center mb-6">About the Project</h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Our ResumeApp is application for a building resume and Screen the resume. It is a smart tool that helps job seekers build professional resumes.
          
        </p>
      </section>

      {/* Features */}
      <section className="bg-white py-12 px-6 md:px-24">
        <h2 className="text-2xl font-semibold text-center mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Easy-to-use Resume Builder with templates",
            "Live Preview and PDF Download",
            "AI-Powered Resume Screening",
            "User Authentication with Role-based Access",
            "Admin Dashboard & User Management",
            "Job Recommendation based on resume"
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-xl shadow-md">
              <h3 className="text-lg font-medium text-indigo-700 mb-2">✅ {feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-6 md:px-24 bg-indigo-50">
        <h2 className="text-2xl font-semibold text-center mb-6">Technology Stack</h2>
        <ul className="flex flex-wrap justify-center gap-6 text-gray-700 text-base">
          {[
            "React 19",
            "Tailwind CSS",
            "TypeScript",
            "Spring Boot (Backend)",
            "MySQL Database",
            "JWT Authentication",
            "NLP for Screening",
            "ShadCN UI",
          ].map((tech, index) => (
            <li key={index} className="bg-white px-4 py-2 rounded-lg shadow">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        Made with ❤️ by Our App | © {new Date().getFullYear()} ResumeApp      </footer>
    </div>
  );
}
