import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Software Developer',
    company: 'Digiprima Technologies',
    location: 'Onsite',
    period: 'Dec 2025 – Present',
    description: [
      'Developed Django-based web applications integrating AI/ML models for intelligent automation.',
      'Created REST APIs to expose AI prediction and automation services to external systems.',
      'Implemented scalable backend architecture handling 1000+ daily API requests.',
      'Collaborated with cross-functional teams to deliver production-ready solutions.',
    ],
    technologies: ['Python', 'Django', 'REST APIs', 'AI/ML', 'PostgreSQL'],
  },
  {
    title: 'Software Developer Intern',
    company: 'GrowwStacks Automation Solutions',
    location: 'Onsite',
    period: 'June 2025 – Nov 2025',
    description: [
      'Designed AI-powered automation workflows using n8n and Make.com, reducing manual processing time by 40%.',
      'Developed intelligent chatbots and automated data pipelines using GPT APIs and ML models.',
      'Handled 1000+ daily interactions through automated systems with 99.5% uptime.',
      'Created custom integrations between CRM systems and marketing automation tools.',
    ],
    technologies: ['n8n', 'Make.com', 'GPT APIs', 'Python', 'Automation'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-progress');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -50 : 50,
            rotateY: index % 2 === 0 ? 15 : -15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/5 to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              Professional Journey
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani']">
              <span className="text-gradient">EXPERIENCE</span>
            </h2>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Center line - desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
              <div className="timeline-progress absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-600 origin-top" style={{ transform: 'scaleY(0)' }} />
            </div>

            {/* Experience Cards */}
            <div className="space-y-12 lg:space-y-0">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                    index > 0 ? 'lg:mt-12' : ''
                  }`}
                >
                  {/* Timeline dot - desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#010304] shadow-lg shadow-cyan-500/50" />
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      index % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'
                    }`}
                  >
                    <div className="group relative p-6 sm:p-8 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 transition-all duration-500">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
                          <Briefcase className="text-white" size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Rajdhani'] group-hover:text-cyan-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-cyan-400 font-medium">{exp.company}</p>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-cyan-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-cyan-400" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                            <ChevronRight size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  {index % 2 === 0 ? (
                    <div className="hidden lg:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center reveal">
            <p className="text-white/60 mb-4">
              Looking for a dedicated developer for your team?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Let's Connect
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
