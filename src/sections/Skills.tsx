import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Brain,
  Cloud,
  Workflow,
  Database,
  Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Programming',
    icon: Code2,
    color: 'from-cyan-500 to-cyan-600',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'C++', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    name: 'AI/ML',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 85 },
      { name: 'NLP', level: 88 },
      { name: 'GenAI', level: 85 },
    ],
  },
  {
    name: 'Frameworks',
    icon: Cpu,
    color: 'from-pink-500 to-pink-600',
    skills: [
      { name: 'Django', level: 92 },
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'FastAPI', level: 85 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-blue-500 to-blue-600',
    skills: [
      { name: 'AWS EC2', level: 85 },
      { name: 'AWS S3', level: 88 },
      { name: 'Lambda', level: 80 },
      { name: 'CloudFormation', level: 75 },
    ],
  },
  {
    name: 'Automation',
    icon: Workflow,
    color: 'from-green-500 to-green-600',
    skills: [
      { name: 'n8n', level: 90 },
      { name: 'Make.com', level: 88 },
      { name: 'Zapier', level: 85 },
      { name: 'GPT APIs', level: 92 },
    ],
  },
  {
    name: 'Core CS',
    icon: Database,
    color: 'from-orange-500 to-orange-600',
    skills: [
      { name: 'Data Structures', level: 90 },
      { name: 'Algorithms', level: 88 },
      { name: 'OOP', level: 92 },
      { name: 'MySQL', level: 85 },
    ],
  },
];

const floatingSkills = [
  'Python', 'Django', 'AI/ML', 'AWS', 'n8n', 'REST APIs',
  'TensorFlow', 'Git', 'Docker', 'Linux', 'NLP', 'GenAI'
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Floating orbs animation
      const orbs = orbsRef.current?.children;
      if (orbs) {
        Array.from(orbs).forEach((orb, index) => {
          gsap.to(orb, {
            y: Math.sin(index) * 20,
            x: Math.cos(index) * 10,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              What I Bring
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani'] mb-6">
              MY <span className="text-gradient">ARSENAL</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and skills that I've mastered
              to build intelligent, scalable, and efficient solutions.
            </p>
          </div>

          {/* Floating Skills Cloud */}
          <div
            className="relative min-h-[150px] mb-16 py-8"
          >
            <div
              ref={orbsRef}
              className="flex flex-wrap justify-center gap-8"
            >
              {floatingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-semibold flex items-center justify-center text-center p-3 transition-all hover:scale-110 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-['Rajdhani']">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                          style={{
                            width: activeCategory === index ? `${skill.level}%` : '0%',
                            transitionDelay: `${skillIndex * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-16 reveal">
            <h3 className="text-xl font-semibold text-white mb-6 text-center font-['Rajdhani']">
              Additional Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Git & GitHub',
                'Cybersecurity Fundamentals',
                'RESTful APIs',
                'Data Visualization',

                'Problem Solving',
                'Team Leadership',
                'Technical Writing',
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
