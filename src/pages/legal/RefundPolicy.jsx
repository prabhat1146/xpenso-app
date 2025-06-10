import React from 'react';
import { RotateCcw } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <RotateCcw className="h-10 w-10 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Refund Policy</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for choosing <span className="font-semibold text-indigo-600">Xpenso</span>. We want to ensure you are satisfied with our services. Please read our refund policy carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Eligibility for Refunds</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>
              <span className="font-medium">Subscription Services:</span> Refunds are available for subscription services within 14 days of your initial purchase or renewal, provided you have not extensively used the service.
            </li>
            <li>
              <span className="font-medium">One-Time Purchases:</span> Refunds for one-time purchases are considered on a case-by-case basis, depending on the nature of the product or service.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. How to Request a Refund</h2>
          <p className="text-gray-700">
            To request a refund, please contact our support team at <a href="mailto:support@xpenso.com" className="text-indigo-600 underline">support@xpenso.com</a> with your order details and the reason for your refund request.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Refund Process</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Upon receiving your request, we will review it and respond within 5-7 business days.</li>
            <li>If your refund is approved, we will process it to your original payment method.</li>
            <li>The time it takes for the refund to appear in your account depends on your payment provider.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Non-Refundable Items</h2>
          <p className="text-gray-700">
            Certain items or services may be non-refundable, as specified at the time of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Policy Updates</h2>
          <p className="text-gray-700">
            We may update this Refund Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Refund Policy, please contact us at <a href="mailto:support@xpenso.com" className="text-indigo-600 underline">support@xpenso.com</a>.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            We appreciate your business and strive to provide a positive experience with Xpenso.
          </p>
        </div>
        <h1 className='text-lg text-red-500 my-4'>Note:- Currently, we are not providing any refunds.</h1>
      </div>
    </div>
  );
};

export default RefundPolicy;
