


const companyLogos = [
  { name: "Google", src: "src/assets/Google.png"   },
  { name: "Amazon", src: "src/assets/Amazon.png" },
  { name: "Microsoft", src: "src/assets/Microsoft.png" },
  { name: "Samsung", src: "src/assets/Samsung.png" },
  { name: "Youtube", src: "src/assets/YT.png" },
  { name: "IBM", src: "src/assets/IBM.png" },
  { name: "LinkedIn", src: "src/assets/Linkedin.png" },
  { name: "Meta", src: "src/assets/Meta.png" }
];

const LogoBlock = () => {
  return (
    <div className="bg-gray-900 py-10 px-6 text-center text-white">
      <h2 className="text-xl font-semibold tracking-wide">
        Trusted by over <span className="text-blue-400">2,000,000+</span> Web Developers
      </h2>
      <div className="mt-2 flex flex-wrap justify-center gap-15 px-10">
        {companyLogos.map((company, index) => (
          <img 
          key={index} 
          src={company.src} 
          alt={company.name} 
          className="h-27 w-auto max-w-[120px] filter invert brightness-90 hover:brightness-100 transition"
        />    
        ))}
      </div>
    </div>
  );
};

export default LogoBlock;
