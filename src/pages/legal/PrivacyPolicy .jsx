import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { contact_us } from '../../constants';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="h-10 w-10 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          At <span className="font-semibold text-indigo-600">Xpenso</span>, your privacy and data security are our top priorities. This policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              <span className="font-medium">Personal Information:</span> We may collect your name, email address, and account details when you register or use Xpenso.
            </li>
            <li>
              <span className="font-medium">Financial Data:</span> All income, expense, and transfer records you enter are securely stored and only accessible to you.
            </li>
            <li>
              <span className="font-medium">Usage Data:</span> We collect anonymized analytics to improve our services and user experience.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>To provide and maintain your account and our services.</li>
            <li>To help you track and analyze your finances.</li>
            <li>To improve Xpenso based on anonymized usage trends.</li>
            <li>We never sell or share your personal data with third parties for marketing.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Data Security</h2>
          <p className="text-gray-700">
            We use industry-standard security measures to protect your data, including encryption and secure authentication. Your financial records are private and only accessible to you.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Your Rights</h2>
          <p className="text-gray-700">
            You can access, update, or delete your personal data at any time from your account settings. For any privacy-related requests, please contact us at <a href={`mailto:${contact_us}`} className="text-indigo-600 underline">{contact_us}</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Policy Updates</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We’ll notify you of any significant changes and always display the latest version on this page.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Thank you for trusting Xpenso with your financial data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
