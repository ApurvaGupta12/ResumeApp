import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is the definition of a resume?",
    answer:
      "A resume is a concise document that summarizes your work experience, education, skills, qualities, and accomplishments. It’s used to showcase your qualifications to potential employers and helps you stand out. It tells employers why you deserve a job interview in one or two powerful pages. Learn more in this article.",
  },
  {
    question: "What is the difference between a CV and a Resume?",
    answer:
      "In the U.S. and elsewhere around the world, the terms 'CV' and 'resume' are often used interchangeably. However, there are some differences. A resume is typically shorter, highlighting relevant skills and experience for a specific job. A CV (curriculum vitae) is more detailed, focusing on your entire career. For most U.S. job applications, a resume is the preferred format.",
  },
  {
    question: "How does the ResumeXpert work?",
    answer:
      "Our AI-powered resume builder analyzes your input and suggests the best resume format, content improvements, and keyword optimizations based on job market trends.",
  },
  {
    question: "Is the resume builder free to use?",
    answer: "Yes, our basic resume templates and AI suggestions are free.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Absolutely! You can download your resume in PDF format once you’re satisfied with the final design.",
  },
  {
    question: "How does the AI screening process work?",
    answer:
      "Our AI scans and analyzes resumes based on job descriptions and provides feedback on improvements, including skills matching and formatting suggestions.",
  },
];

export default function FAQ() {
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto my-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      <h2 className="text-5xl font-semibold text-center text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Disclosure key={index} as="div">
            {({ open }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <Disclosure.Button className="flex justify-between w-full py-3 text-lg font-medium text-gray-800 border-b border-gray-300 focus:outline-none">
                  {faq.question}
                  <ChevronUpIcon
                    className={`w-6 h-6 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Disclosure.Button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <Disclosure.Panel className="py-3 text-gray-700">
                        {faq.answer}
                      </Disclosure.Panel>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </Disclosure>
        ))}
      </div>
    </motion.div>
  );
}
