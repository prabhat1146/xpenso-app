import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="h-10 w-10 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Disclaimer</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          The information provided by <span className="font-semibold text-indigo-600">Xpenso</span> is for general informational and personal finance management purposes only. By using our website and services, you acknowledge and agree to the following:
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Not Financial Advice</h2>
          <p className="text-gray-700">
            Xpenso does not provide financial, investment, tax, or legal advice. All content and features are intended to help you track and manage your finances, but should not be considered as professional advice. For specific financial guidance, please consult a qualified professional.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Accuracy of Information</h2>
          <p className="text-gray-700">
            While we strive to provide accurate and up-to-date information, Xpenso makes no warranties or representations regarding the completeness, reliability, or accuracy of any information or data provided by the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Responsibility</h2>
          <p className="text-gray-700">
            You are solely responsible for the accuracy of the financial data you enter and the decisions you make based on the information provided by Xpenso.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            Xpenso and its team are not liable for any losses, damages, or consequences resulting from your use of the website or services. Use Xpenso at your own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. External Links</h2>
          <p className="text-gray-700">
            Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Changes to This Disclaimer</h2>
          <p className="text-gray-700">
            We may update this Disclaimer from time to time. Any changes will be posted on this page.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            If you have any questions about this Disclaimer, please contact us at <a href="mailto:support@xpenso.com" className="text-indigo-600 underline">support@xpenso.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
