import React from 'react';

const About = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden overflow-y-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-8 animate-pulse">
            <div className="bg-slate-900 rounded-full px-6 py-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                GitHub Tracker
              </span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            <span className="inline-block transform hover:scale-110 transition-transform duration-300">A</span>
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-75">b</span>
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-150">o</span>
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-225">u</span>
            <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-300">t</span>
            <span className="mx-4"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 inline-block transform hover:scale-110 transition-transform duration-300 delay-375">U</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 inline-block transform hover:scale-110 transition-transform duration-300 delay-450">s</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the future of issue tracking. We're revolutionizing how developers 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold"> collaborate </span>
            and manage their GitHub workflows.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mission</span>
            </h2>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl animate-bounce">
                🚀
              </div>
              <p className="text-xl text-gray-200 leading-relaxed">
                We're on a mission to provide the most <span className="text-purple-400 font-semibold">efficient</span> and 
                <span className="text-pink-400 font-semibold"> intuitive</span> GitHub issue tracking experience. 
                Our platform empowers developers to stay organized, focused, and productive without drowning in complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Create</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group cursor-pointer">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    🔍
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    Smart Issue Tracking
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Experience next-level issue tracking with intelligent filters, advanced search capabilities, 
                    and real-time synchronization with your GitHub repositories.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group cursor-pointer">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    👥
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors">
                    Team Synergy
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Foster seamless collaboration with real-time updates, intelligent notifications, 
                    and workflow automation that keeps your entire team in perfect sync.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group cursor-pointer">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform duration-500">
                    ⚙️
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    Infinite Customization
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Tailor every aspect of your workflow with powerful customization options, 
                    automated rules, and integrations that adapt to your team's unique processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 rounded-3xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of developers who've already revolutionized their GitHub experience.
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-700"></div>
      </div>
    </div>
  );
};

export default About;