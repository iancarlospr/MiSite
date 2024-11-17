import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, Building } from 'lucide-react';
import { LinkCard } from './components/LinkCard';
import { InteractiveBackground } from './components/InteractiveBackground';
import profileImage from './assets/profile.jpg';

function App() {
  return (
    <main className="h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-neutral-50">
      {/* Animated gradient background */}
      <div className="fixed inset-0 animate-gradient bg-gradient-to-br from-charcoal-900 via-black to-charcoal-800/20" />
      
      {/* Interactive particle background */}
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Section */}
          <div className="text-center space-y-4">
            <motion.div
              className="relative w-32 h-32 mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-full w-full h-full object-cover glass p-1"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-charcoal-700 to-charcoal-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-zinc-100">Ian C. Ramírez Rivera</h1>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                Tech Enthusiast
              </p>
            </motion.div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <LinkCard
              href="https://iancarlospr.github.io/rrg22agency/"
              title="Personal Website"
              icon={<Globe className="w-6 h-6 text-zinc-400" />}
              delay={0.4}
            />
            <LinkCard
              href="https://rrg22.com"
              title="Real Estate Portfolio"
              icon={<Building className="w-6 h-6 text-zinc-400" />}
              delay={0.5}
            />
            <LinkCard
              href="https://www.linkedin.com/in/iancarlospr/"
              title="LinkedIn Profile"
              icon={<Linkedin className="w-6 h-6 text-zinc-400" />}
              delay={0.7}
            />
            <LinkCard
              href="https://github.com/iancarlospr"
              title="GitHub Projects"
              icon={<Github className="w-6 h-6 text-zinc-400" />}
              delay={0.6}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default App;