
import { motion } from "framer-motion";
import Img1 from "@/assets/Resume/Img1.jpg";
import Img2 from "@/assets/Resume/Img2.webp";
import Img3 from "@/assets/Resume/Img3.webp";
import Img4 from "@/assets/Resume/Img4.png";
import Img5 from "@/assets/Resume/Img5.png";
import Img6 from "@/assets/Resume/Img6.webp";
import Img7 from "@/assets/Resume/Img7.jpeg";
import Img8 from "@/assets/Resume/Img8.jpg";
import Img9 from "@/assets/Resume/Img9.jpeg";
import Img10 from "@/assets/Resume/Img10.jpg";
import Img11 from "@/assets/Resume/Img11.png";
import Img12 from "@/assets/Resume/Img12.jpg";

// First column images
const column1Images = [Img1, Img2, Img3, Img4, Img5, Img6];
// Second column images (different from first)
const column2Images = [Img7, Img8, Img9, Img10, Img11, Img12];
type PromoProps = {
  onGetStartedClick: () => void;
};
const Promo: React.FC<PromoProps> = ({ onGetStartedClick }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Build Your Perfect Resume 
            </h1>
            <p className="mt-4 text-2xl text-gray-700">
              Create professional resumes effortlessly using our AI-powered resume builder.
            </p>
          </div>

          <div className="relative mt-10 flex">
            {/* Left Content */}
            <div className="w-1/2 flex items-center">
              <button
                onClick={onGetStartedClick}
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Get Started
              </button>
            </div>

            {/* 2 Column Zigzag Image Grid */}
            <div className="relative w-1/2 overflow-hidden h-96 -mt-80 ml-30">
              <motion.div
                className="absolute flex gap-6"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 65,
                  ease: "linear",
                }}
              >
                {/* Column 1 */}
                <div className="grid grid-cols-1 gap-6">
                  {[...column1Images, ...column1Images].map((src, index) => (
                    <div key={`col1-${index}`} className="h-60 w-45 overflow-hidden rounded-lg">
                      <img src={src} alt="" className="size-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="grid grid-cols-1 gap-6 mt-80">
                  {[...column2Images, ...column2Images].map((src, index) => (
                    <div key={`col2-${index}`} className="h-55 w-40 overflow-hidden rounded-lg">
                      <img src={src} alt="" className="size-full object-cover" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo;
