"use client";

import { motion } from "framer-motion";

const Home = () => {
  const MotionDiv = motion.div;

  return (
    <div className="min-h-screen bg-[#0F172A] overflow-hidden relative">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/30 blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Baldev
          </h1>
          <div className="flex gap-8 items-center">
            <button className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              Communauté
            </button>
            <button className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300">
              Commencer
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl font-bold text-white mb-8 leading-tight"
          >
            La{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Documentation
            </span>
            <br />
            du Web Réinventée
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Rejoignez une communauté passionnée pour créer la plus grande
            ressource de documentation technique du web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            <button className="group bg-gradient-to-r from-violet-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300">
              Explorer la documentation
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl text-lg hover:bg-white/20 transition-all duration-300">
              Contribuer
            </button>
          </motion.div>
        </MotionDiv>

        
      </main>
    </div>
  );
};

export default Home;
