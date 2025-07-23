import { Mail, Phone, Send, X, Github } from 'lucide-react';
import { useState } from "react";

function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form refresh
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowPopup(true);

    // Auto-close popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-4xl font-semibold text-center mb-10">Contact Us</h1>

      <div className="grid lg:grid-cols-2 gap-8 items-start flex-1 min-h-0">
        {/* Contact Info Cards */}
        <div className="space-y-6 h-full flex flex-col">
          <div className="text-center lg:text-left flex-shrink-0">
            <h2 className="text-2xl font-bold text-white mb-3">Let's Connect</h2>
            <p className="text-gray-400 text-base">
              We're here to help you track and manage your GitHub repositories more effectively
            </p>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div className="group bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Phone Support</h3>
                  <p className="text-gray-300 text-sm">(123) 456-7890</p>
                  <p className="text-xs text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Email Us</h3>
                  <p className="text-gray-300 text-sm">support@githubtracker.com</p>
                  <p className="text-xs text-gray-400">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">GitHub Issues</h3>
                  <p className="text-gray-300 text-sm">github.com/yourorg/githubtracker</p>
                  <p className="text-xs text-gray-400">Report bugs & feature requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-2xl h-full flex flex-col"
        >
          <h2 className="text-xl font-bold text-white mb-4 text-center flex-shrink-0">Send us a Message</h2>

          <div className="space-y-4 flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <select className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm">
                  <option value="" className="bg-slate-800">Select a topic</option>
                  <option value="bug" className="bg-slate-800">Bug Report</option>
                  <option value="feature" className="bg-slate-800">Feature Request</option>
                  <option value="support" className="bg-slate-800">Technical Support</option>
                  <option value="general" className="bg-slate-800">General Inquiry</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full h-full min-h-[120px] p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-sm"
                  placeholder="Tell us about your GitHub tracking needs or describe your issue..."
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-lg w-full sm:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Message Sent!
            </h2>
            <p className="text-black dark:text-white text-center mb-6">
              Your message has been successfully sent. We will get back to you
              soon.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleClosePopup}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
