import React from "react";
import {
  FaQuestionCircle,
  FaShieldAlt,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <FaQuestionCircle className=" text-2xl" />
            <h2 className="text-xl font-semibold">
              Frequently Asked Questions
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>How do I reset my password?</li>
            <li>How do I report an issue?</li>
            <li>How can I delete my account?</li>
          </ul>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <FaShieldAlt className=" text-2xl" />
            <h2 className="text-xl font-semibold">Privacy & Safety</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Learn about how we protect your data and how you can stay safe while
            using our app.
          </p>
        </div>

        {/* Account Security */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <FaLock className=" text-2xl" />
            <h2 className="text-xl font-semibold">Account Security</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Tips on keeping your account secure, enabling 2FA, and recognizing
            suspicious activity.
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white shadow-md p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-2xl" />
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>
          <p className="text-gray-700 text-sm mb-2">
            Still have questions or facing a problem?
          </p>
          <button className="bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
