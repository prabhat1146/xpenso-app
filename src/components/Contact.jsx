import React from "react";
import {
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Contact() {
  const openEmail = () => window.open("mailto:support@expenso.app", "_blank");
  const callSupport = () => window.open("tel:+919999999999", "_blank");

  return (
    <div className="min-h-screen bg-white px-6 pt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
      <p className="text-gray-500 text-base mb-6">
        We’re here to help. Reach out via email or phone.
      </p>

      {/* Contact Info */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <Mail className="w-6 h-6 text-blue-600" />
          <a
            href="mailto:support@expenso.app"
            className="ml-3 text-blue-600 text-base underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@expenso.app
          </a>
        </div>
        <div className="flex items-center">
          <Phone className="w-6 h-6 text-green-600" />
          <a
            href="tel:+919999999999"
            className="ml-3 text-green-600 text-base underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            +91 99999 99999
          </a>
        </div>
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-yellow-500" />
          <span className="ml-3 text-gray-700 text-base">
            Mon–Fri, 9:00 AM – 6:00 PM
          </span>
        </div>
      </div>

      {/* Support Prompt */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Got a suggestion or issue?
      </h2>
      <p className="text-gray-600 mb-4">
        We're always improving. Let us know if you find bugs or have ideas!
      </p>
      <button
        className="bg-blue-600 py-3 rounded-xl w-full text-white font-bold text-base mb-8"
        onClick={openEmail}
      >
        Send Feedback
      </button>

      {/* Social Icons */}
      <div className="border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-center mb-3">Connect with us</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://facebook.com/expensoapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7 text-[#1877F2] hover:scale-110 transition" />
          </a>
          <a
            href="https://instagram.com/expensoapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7 text-[#E4405F] hover:scale-110 transition" />
          </a>
          <a
            href="https://twitter.com/expensoapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-7 h-7 text-[#1DA1F2] hover:scale-110 transition" />
          </a>
        </div>
      </div>
    </div>
  );
}
