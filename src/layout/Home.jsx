import React from "react";
import { PiggyBank, ShieldCheck, BarChart3, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold">Xpenso – Smart Expense Manager</h1>
        <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
          Track your money effortlessly, stay in control, and grow your savings with 
          a clean and modern finance companion.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to={'/pages/user/login'} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-indigo-100 transition">
            Get Started
          </Link>
          {/* <button className="bg-transparent border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button> */}
        </div>
      </section>

      <main className="p-8 space-y-20">
        {/* About Section */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">About Xpenso</h2>
          <p className="mt-4 text-lg text-gray-600">
            Xpenso is your all-in-one personal finance tracker designed to simplify money 
            management. From daily expenses to long-term savings goals, Xpenso helps you 
            build better financial habits with ease.
          </p>
        </section>

        {/* Why Xpenso Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Xpenso?</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <PiggyBank className="mx-auto text-indigo-500" size={48} />
              <h3 className="mt-4 font-semibold text-lg">Smart Savings</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Automatically track your spending and see how much you save each month.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <ShieldCheck className="mx-auto text-green-500" size={48} />
              <h3 className="mt-4 font-semibold text-lg">Secure & Private</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Your data is encrypted and stored safely, ensuring privacy and protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <BarChart3 className="mx-auto text-pink-500" size={48} />
              <h3 className="mt-4 font-semibold text-lg">Visual Insights</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Get clear insights into your finances with easy-to-read charts and stats.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <Smartphone className="mx-auto text-yellow-500" size={48} />
              <h3 className="mt-4 font-semibold text-lg">Anytime, Anywhere</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Manage your finances on the go with a mobile-first design.
              </p>
            </div>
          </div>
        </section>

        {/* How We Maintain Section */}
        <section className="bg-white rounded-2xl shadow-md p-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">How We Maintain It</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <h3 className="font-semibold text-lg">Regular Updates</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Xpenso is continuously improved with new features and security patches.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Data Security</h3>
              <p className="mt-2 text-gray-600 text-sm">
                We maintain strict compliance to keep your financial data safe.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Customer Support</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Our support team is here to help you with any issues 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Take Control of Your Finances Today</h2>
          <p className="my-4 text-lg text-gray-600">
            Start using Xpenso and experience stress-free money management.
          </p>
          <Link to={'/pages/user/login'} className="my-10 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl shadow transition text-lg font-semibold">
            Get Started for Free
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
