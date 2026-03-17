import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Vendor Profit Analytics Platform',
    subtitle: 'Amazon Seller Analytics Dashboard',
    description:
      'A comprehensive analytics platform that allows vendors to connect their Amazon seller accounts and track business performance in real-time. Features include profit tracking, revenue analysis, fee breakdown, and margin calculations.',
    image: '/project-vendor.jpg',
    technologies: ['Python', 'AI', 'Amazon SP-API', 'Django'],
    features: [
      'Integrated Amazon Selling Partner API (SP-API) to fetch sales reports, orders, and inventory data',
      'Built backend using Python (Django) REST APIs to process sales data and calculate profit, revenue, fees, and margins',
      'Real-time dashboard with interactive charts and data visualization',
      'Automated data synchronization and report generation',
    ],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Smart Krashi',
    subtitle: 'Smart Agriculture Management System',
    description:
      'An intelligent agriculture platform designed to digitize farm management and crop monitoring. Helps farmers monitor production, track farm activities, and make data-driven decisions for better yield.',
    image: '/project-smartkrashi.jpg',
    technologies: ['Python', 'AI', 'Machine Learning', 'MySQL',],
    features: [
      'Implemented crop management and farm data tracking with agricultural insights',
      'Database-driven farm records system for storing crop cycles, field information, and activities',
      'Weather integration and predictive analytics for crop health',
      'Mobile-responsive design for field access',
    ],
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              My Work
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani'] mb-6">
              FEATURED <span className="text-gradient">PROJECTS</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Showcasing my best work in AI, automation, and full-stack development.
              Each project represents a unique challenge and innovative solution.
            </p>
          </div>

          {/* Projects Display */}
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Projects Grid */}
            <div ref={cardsRef} className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${activeIndex === index ? 'lg:scale-105' : 'lg:scale-100 lg:opacity-80'
                    }`}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010304] via-[#010304]/80 to-transparent" />

                    {/* Scanline effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Rajdhani'] mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-cyan-400 text-sm mb-3">{project.subtitle}</p>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 hidden sm:block">
                      {project.features.slice(0, 2).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-white/60 text-xs">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>


                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-cyan-500/30 transition-colors pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 lg:hidden">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === index
                    ? 'bg-cyan-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* View All Projects CTA */}
          <div className="mt-16 text-center reveal">
            <a
              href="https://github.com/Nayan27103"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-cyan-500/50 transition-all group"
            >
              <Github size={20} />
              View All Projects on GitHub
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
