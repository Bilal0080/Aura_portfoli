import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, ChevronRight, Menu, X, Filter, Maximize2, Twitter, Dribbble } from "lucide-react";
import { useState, useRef, useMemo, useEffect } from "react";
import { PROJECTS, SKILLS, Project } from "./constants.tsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    PROJECTS.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans" ref={containerRef}>
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-80 md:h-96 relative flex-shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-16 overflow-y-auto">
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">About the project</h4>
                    <p className="text-xl text-zinc-600 leading-relaxed mb-8">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Project Links</h4>
                    <div className="flex flex-col gap-4">
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-colors group"
                      >
                        <span className="font-bold text-zinc-900">Live Preview</span>
                        <ExternalLink className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                      </a>
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-colors group"
                        >
                          <span className="font-bold text-zinc-900">Source Code</span>
                          <Github className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform">A</div>
            <span>AURA.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Projects", "Skills", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-all">
              Resume
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-zinc-200 p-6 flex flex-col gap-4"
          >
            {["Projects", "Skills", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-zinc-900"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section - Recipe 11 Inspired */}
        <section id="about" className="relative pt-40 pb-20 px-6 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for new projects
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8 text-balance"
              >
                Crafting digital <span className="text-zinc-400">experiences</span> that matter.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-zinc-600 max-w-lg mb-10 leading-relaxed"
              >
                Senior Product Designer & Creative Developer based in London. 
                I build high-performance interfaces that bridge the gap between design and technology.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <button className="group px-8 py-4 bg-zinc-900 text-white rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Github className="w-5 h-5" /></a>
                  <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden bg-zinc-200"
            >
              <img 
                src="https://picsum.photos/seed/portfolio-hero/1200/1200" 
                alt="Hero" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                <p className="text-sm font-medium text-zinc-900 mb-1 italic">Featured Work</p>
                <h3 className="text-xl font-bold text-zinc-900">EcoSphere Dashboard v2.0</h3>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section - Recipe 8 Inspired */}
        <section id="projects" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Selected Works</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Case Studies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === tag 
                        ? "bg-zinc-900 text-white shadow-md" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: idx * 0.05,
                      ease: [0.215, 0.61, 0.355, 1] 
                    }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 bg-zinc-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Thumbnail Overlay */}
                      <div className="absolute top-4 left-4 z-10 w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                        <img 
                          src={project.thumbnail} 
                          alt={`${project.title} thumbnail`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="px-6 py-3 bg-white text-zinc-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                        >
                          View Details
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <div className="flex gap-3">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors border border-white/30">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors border border-white/30">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-zinc-900 text-white rounded-full border border-zinc-800 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-2xl font-bold hover:text-emerald-600 hover:scale-[1.05] transition-all duration-300 tracking-tight cursor-pointer origin-left">
                        {project.title}
                      </h4>
                      <span className="text-sm font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{project.year}</span>
                    </div>
                    <p className="text-zinc-500 leading-relaxed mb-6 line-clamp-2">{project.description}</p>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-bold flex items-center gap-2 text-zinc-900 hover:gap-3 transition-all group/btn"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Expertise</h2>
                <h3 className="text-4xl font-bold tracking-tight mb-6">Technical Stack</h3>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  I specialize in building scalable web applications using the latest technologies and best practices.
                </p>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                {SKILLS.map((skill, idx) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: idx * 0.1,
                      ease: "easeOut"
                    }}
                    className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white">
                        {skill.icon}
                      </div>
                      <h4 className="text-xl font-bold">{skill.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <span key={item} className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-lg border border-zinc-100">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-400 blur-[120px] rounded-full" />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-8">
                  Let's build something <br /> <span className="text-zinc-500 italic font-serif">extraordinary</span> together.
                </h2>
                <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto">
                  Currently accepting new projects and collaborations. 
                  Reach out and let's discuss your next big idea.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="mailto:hello@aura.design" 
                    className="px-10 py-5 bg-white text-zinc-900 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all flex items-center gap-2"
                  >
                    Start a Conversation
                    <ChevronRight className="w-5 h-5" />
                  </a>
                  <div className="flex items-center gap-6 text-zinc-400">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
            <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tighter group">
              <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform">A</div>
              <span>AURA.</span>
            </a>
            
            <div className="flex items-center gap-6">
              <a href="https://twitter.com/aura_design" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 text-zinc-600 rounded-full hover:bg-zinc-900 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/aura-design" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 text-zinc-600 rounded-full hover:bg-zinc-900 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://dribbble.com/aura_design" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 text-zinc-600 rounded-full hover:bg-zinc-900 hover:text-white transition-all">
                <Dribbble className="w-5 h-5" />
              </a>
              <a href="https://github.com/aura-design" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-100 text-zinc-600 rounded-full hover:bg-zinc-900 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-zinc-100">
            <div className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Aura Portfolio. Built with React & Tailwind.
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-zinc-600">
              <a href="#about" className="hover:text-zinc-900 transition-colors">About</a>
              <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
