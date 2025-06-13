import { motion } from "framer-motion";
import I1 from "@/assets/FeaturIcon/I1.png";
import I2 from "@/assets/FeaturIcon/I2.png";
import I3 from "@/assets/FeaturIcon/I3.png";
import I4 from "@/assets/FeaturIcon/I4.png";
import I5 from "@/assets/FeaturIcon/I5.png";
import I6 from "@/assets/FeaturIcon/I6.png";

const features = [
  {
    name: "A better resume in minutes",
    description: "Replace your old resume in a few simple clicks. Our builder gives recruiters what they want.",
    icon: I1,
  },
  {
    name: "ATS friendly templates",
    description: "Tick every box and make sure your resume is never filtered out by the hiring software.",
    icon: I2,
  },
  {
    name: "Pre-written content",
    description: "Stop worrying about words. Save time by adding pre-approved, tested content from certified writers.",
    icon: I3,
  },
  {
    name: "Easy with AI",
    description: "Quickly generate formal phrases and summaries. Sound professional, faster.",
    icon: I4,
  },
  {
    name: "Beat the competition",
    description: "Our tested resume templates are designed to make you more attractive to recruiters.",
    icon: I5,
  },
  {
    name: "Get paid more",
    description: "A higher salary begins with a strong resume. Our salary analyzer tells you if your job offer is competitive (or not).",
    icon: I6,
  },
];

export default function Feature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading Animation */}
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.5 }}  // 👈 This makes it trigger multiple times when scrolling
        >
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get hired fast with a powerful resume
          </p>
        </motion.div>

        {/* Features Animation */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="relative pl-17"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} 
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ amount: 0.3 }} // 👈 This ensures animation happens again when scrolling back
              >
                <dt className="text-lg sm:text-l font-bold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-lg">
                    <img
                      src={feature.icon}
                      alt={feature.name}
                      className="size-9 object-contain"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/5 font-semibold text-gray-600">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
