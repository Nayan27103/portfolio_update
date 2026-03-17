import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Trophy, Code2, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, value: '200+', label: 'LeetCode Problems' },
  { icon: Trophy, value: '40%', label: 'Efficiency Gain' },
  { icon: Users, value: '5+', label: 'AI Projects' },
  { icon: GraduationCap, value: '8.31', label: 'CGPA' },
];

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering (AI)',
    institution: 'Medicaps University, Indore',
    period: '2021 – 2025',
    grade: 'CGPA: 8.31',
  },
  {
    degree: '12th PCM',
    institution: 'Scholars Den H.S. School, Khandwa',
    period: '2021',
    grade: '91%',
  },
  {
    degree: '10th Standard',
    institution: 'Scholars Den H.S. School, Khandwa',
    period: '2019',
    grade: '89%',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content reveal animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              Discover My Story
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani']">
              ABOUT <span className="text-gradient">ME</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Image */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="/nayann.png"
                  alt="Nayan Patel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010304] via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl glass border border-cyan-500/20 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Code2 className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-white font-semibold">Software Developer</span>
                </div>
                <p className="text-white/60 text-sm">
                  Transforming ideas into intelligent, scalable solutions.
                </p>
              </div>

              {/* Decorative ring */}
              <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 border-2 border-cyan-500/20 rounded-full" />
              <div className="absolute -z-10 -bottom-8 -left-4 w-20 h-20 border-2 border-purple-500/20 rounded-full" />
            </div>

            {/* Right - Content */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-['Rajdhani']">
                  Software Developer & AI Enthusiast
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  I am a Software Developer specializing in Python, AI/ML, and AI Automation.
                  With a strong foundation in Machine Learning and Cloud Deployment (AWS),
                  I build scalable solutions that process millions of data points.
                </p>
                <p className="text-white/70 leading-relaxed">
                  My journey involves crafting intelligent workflows using n8n and Make.com,
                  reducing manual effort by up to 40%. I'm passionate about creating technology
                  that makes a real difference in how businesses operate.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <GraduationCap className="text-cyan-400" size={24} />
                  Education
                </h4>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                          {edu.degree}
                        </h5>
                        <span className="text-cyan-400 text-sm font-semibold">
                          {edu.grade}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{edu.institution}</p>
                      <p className="text-white/40 text-xs mt-1">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Trophy className="text-cyan-400" size={24} />
                  Achievements & Activities
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    Solved 200+ algorithmic problems on LeetCode, HackerRank
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    Led university science club workshops on AI/ML fundamentals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    Active open-source contributor in AI automation and ML projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    Team Leader and Class Representative
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl glass border border-white/10 text-center group hover:border-cyan-500/30 transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <stat.icon className="text-cyan-400" size={24} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1 font-['Rajdhani']">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
