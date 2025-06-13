import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">Resume Builder AI</h2>
            <p className="mt-3 text-sm text-gray-400">
              AI-powered resume builder & screening assistant for job seekers.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-white">Resume Templates</a></li>
              <li><a href="#" className="hover:text-white">Cover Letter Templates</a></li>
              <li><a href="#" className="hover:text-white">Interview Tips</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="#" className="hover:text-white"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
          <a href="#" className="hover:text-white"><FaLinkedin size={24} /></a>
          <a href="#" className="hover:text-white"><FaYoutube size={24} /></a>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Resume Builder AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
