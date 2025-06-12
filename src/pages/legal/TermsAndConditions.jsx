import React from 'react';
import { FileText } from 'lucide-react';
import { contact_us } from '../../constants';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-10 w-10 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Terms &amp; Conditions</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to <span className="font-semibold text-indigo-600">Xpenso</span>. By using our website and services, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using Xpenso, you agree to be bound by these Terms &amp; Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Use of Service</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Xpenso is intended for personal financial management only.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Do not use Xpenso for any unlawful or fraudulent activities.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, trademarks, and intellectual property on Xpenso are owned by us or our licensors. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            Xpenso is provided "as is" without warranties of any kind. We are not liable for any losses or damages resulting from your use of our services. Always consult a financial advisor for professional advice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms &amp; Conditions from time to time. Continued use of Xpenso after changes means you accept the updated terms. The latest version will always be available on this page.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms &amp; Conditions, please contact us at <a href={`mailto:${contact_us}`} className="text-indigo-600 underline">{contact_us}</a>.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Thank you for choosing Xpenso to manage your finances responsibly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
