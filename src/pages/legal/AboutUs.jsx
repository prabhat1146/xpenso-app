import React from 'react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Repeat } from 'lucide-react';

const features = [
  {
    icon: <ArrowDownCircle className="h-8 w-8 text-green-500" />,
    title: 'Track Income',
    description: 'Easily record all your income sources and monitor your financial growth in real-time.',
  },
  {
    icon: <ArrowUpCircle className="h-8 w-8 text-red-500" />,
    title: 'Manage Expenses',
    description: 'Categorize and analyze your spending patterns to take control of your expenses.',
  },
  {
    icon: <Repeat className="h-8 w-8 text-blue-500" />,
    title: 'Transfers',
    description: 'Seamlessly log and track fund transfers between accounts for complete financial clarity.',
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="h-10 w-10 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">About Xpenso</h1>
        </div>
        <p className="text-lg text-gray-700 mb-10">
          <span className="font-semibold text-indigo-600">Xpenso</span> is your all-in-one solution for tracking income, expenses, and transfers. Our mission is to help you organize your finances, gain insights into your spending habits, and achieve your financial goals with ease and confidence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              {feature.icon}
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h2>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-800">Secure. Insightful. Effortless.</h3>
          <p className="mt-2 text-gray-500">
            Start organizing your finances with Xpenso and take the first step towards financial freedom.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
