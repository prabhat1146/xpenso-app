import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Brand / About */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">ExpenseApp</h2>
          <p className="text-sm">
            Manage your daily expenses, analyze spending, and stay on top of your finances.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-md font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Expense</a></li>
            <li><a href="#" className="hover:text-white">Add New</a></li>
            <li><a href="#" className="hover:text-white">Analysis</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-md font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 12345 67890</li>
            <li className="flex items-center gap-2"><Mail size={16} /> support@expenseapp.io</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-md font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {currentYear} ExpenseApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
