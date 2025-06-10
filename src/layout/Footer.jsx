import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Brand / About */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">Xpenso</h2>
          <p className="text-sm">
            Manage your daily expenses, analyze spending, and stay on top of your finances.
          </p>
        </div>
        

        {/* Quick Links */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-white text-md font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="https://mithilax.vercel.app/" className="hover:text-white">MithilaX</a></li>
            <li><a href="https://mithila-vibes-klbd.vercel.app/" className="hover:text-white">Mithila-vibes</a></li>
           
          </ul>
          </div>
          <div>
            <h3 className="text-white text-md font-semibold mb-2">Legal</h3>
          <ul className="text-sm space-y-2">
            <li><Link to={"/pages/legal/about-us"} className="hover:text-white">About Us</Link></li>
            <li><Link to={"/pages/legal/privacy-policy"} className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to={"/pages/legal/terms-and-conditions"} className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to={"/pages/legal/refund-policy"} className="hover:text-white">Refund Policy</Link></li>
            <li><Link to={"/pages/legal/disclaimer"} className="hover:text-white">Disclaimer</Link></li>
            
          </ul>
          
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-md font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 7080206885</li>
            <li className="flex items-center gap-2"><Mail size={16} /> prabhat@businessbasket.in</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-md font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/share/16nwjg6cGE/"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="https://www.linkedin.com/company/mithilax-private-limited/"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {currentYear} Xpenso. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
