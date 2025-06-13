import React from "react";
import { motion } from "framer-motion";
import Bg from "@/assets/Resume/Bg.jpg";

const CTA: React.FC = () => {
  return (
    <motion.div
      className="bg-white w-full"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }} // Initial state for the whole section
      animate={{ opacity: 1 }} // Final state for the whole section
      transition={{ duration: 1 }} // Duration of the fade-in transition
    >
      <div className="w-full py-24 sm:py-32 px-4 lg:px-0">
        <div className="relative isolate overflow-hidden bg-gray-900/70 px-6 pt-16 shadow-2xl 
          sm:rounded-3xl sm:px-12 md:pt-24 lg:flex lg:gap-x-10 lg:px-16 lg:pt-0"
        >
          {/* Background SVG */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 
            [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 
            lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset="1" stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Left Content */}
          <motion.div
            className="max-w-md text-center lg:flex-auto lg:py-32 lg:text-left"
            initial={{ x: -50, opacity: 0 }} // Initial state for the content
            animate={{ x: 0, opacity: 1 }} // Animate to final state
            transition={{ duration: 1, delay: 0.3 }} // Duration and delay increased for better effect visibility
          >
            <motion.h2
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              initial={{ y: -20, opacity: 0 }} // Initial state for heading
              animate={{ y: 0, opacity: 1 }} // Final state for heading
              transition={{ duration: 1, delay: 0.5 }} // Duration and delay increased
            >
              Boost your productivity. Start using our app today.
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-gray-300"
              initial={{ y: 20, opacity: 0 }} // Initial state for description
              animate={{ y: 0, opacity: 1 }} // Final state for description
              transition={{ duration: 1, delay: 0.7 }} // Duration and delay increased
            >
              "Land your dream job faster with our AI-powered Resume Builder & Screening Assistant – Smart, Fast, and Personalized!"
            </motion.p>
            <motion.div
              className="mt-10 flex items-center gap-x-6 lg:justify-start"
              initial={{ opacity: 0 }} // Initial state for buttons
              animate={{ opacity: 1 }} // Final state for buttons
              transition={{ duration: 1, delay: 1 }} // Duration and delay increased
            >
              <motion.a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold 
                text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-white"
                whileHover={{ scale: 1.1 }} // Button hover scale effect
                whileTap={{ scale: 0.95 }} // Button click scale effect
              >
                Get started
              </motion.a>
              <motion.a
                href="#"
                className="text-sm font-semibold text-white"
                whileHover={{ scale: 1.05 }} // Hover scale effect for "Learn More"
              >
                Learn more <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTA;
