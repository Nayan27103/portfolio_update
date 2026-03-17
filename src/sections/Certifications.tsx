import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Cloud, Brain, Shield, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    name: 'AWS Cloud Foundations',
    provider: 'Amazon Web Services',
    description: 'Hands-on AWS Services including EC2, S3, Lambda, and CloudFormation',
    icon: Cloud,
    color: 'from-orange-500 to-orange-600',
    date: '2024',
  },
  {
    name: 'Fundamentals of Generative AI',
    provider: 'Microsoft',
    description: 'Comprehensive understanding of GenAI concepts and applications',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    date: '2024',
  },
  {
    name: 'Fundamentals of Machine Learning',
    provider: 'Microsoft',
    description: 'Core ML algorithms, model training, and deployment strategies',
    icon: Code,
    color: 'from-green-500 to-green-600',
    date: '2024',
  },
  {
    name: 'Cybersecurity Essentials',
    provider: 'Cisco',
    description: 'Network security, threat detection, and security best practices',
    icon: Shield,
    color: 'from-cyan-500 to-cyan-600',
    date: '2024',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              Continuous Learning
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani'] mb-6">
              <span className="text-gradient">CERTIFICATIONS</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Professional certifications that validate my expertise and commitment
              to staying current with industry standards.
            </p>
          </div>

          {/* Certifications Grid */}
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity -z-10`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <cert.icon className="text-white" size={28} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 font-['Rajdhani'] group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-cyan-400 text-sm mb-3">{cert.provider}</p>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {cert.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">{cert.date}</span>

                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${cert.color} opacity-10 rotate-45 group-hover:opacity-20 transition-opacity`} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Banner */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 reveal">
            {[
              { value: '4+', label: 'Certifications' },
              { value: '3', label: 'Top Providers' },
              { value: '100%', label: 'Completion Rate' },
              { value: '2024', label: 'Latest Achievement' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-1 font-['Rajdhani']">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Learning Journey */}
          <div className="mt-16 text-center reveal">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-cyan-500/20">
              <Award className="text-cyan-400" size={20} />
              <span className="text-white/80 text-sm">
                Always learning, always growing. Currently exploring Advanced AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
