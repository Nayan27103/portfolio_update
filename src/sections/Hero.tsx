import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([nameRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 100,
        rotateY: -30,
      });
      gsap.set(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
      });
      gsap.set(socialsRef.current, {
        opacity: 0,
        x: -30,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            x: 0,
            rotateY: -5,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.5'
        )
        .to(
          socialsRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          rotateY: -5 + xPercent * 5,
          rotateX: yPercent * 5,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p
              ref={titleRef}
              className="text-cyan-400 font-medium text-lg mb-4 tracking-wide"
            >
              Hello, I'm
            </p>

            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 font-['Rajdhani'] leading-tight"
            >
              <span className="text-gradient">NAYAN</span>
              <br />
              <span className="text-white">PATEL</span>
            </h1>

            <p
              ref={descRef}
              className="text-xl sm:text-2xl text-white/80 mb-8 font-light"
            >
              Software Developer & AI Specialist
            </p>

            <p className="text-base text-white/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I craft intelligent systems and automation workflows that bridge the gap
              between complex data and human intuition. Specializing in Python, Django,
              and AI-driven solutions.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href="#projects"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore My Work
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-cyan-500/50 transition-all"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Nayan27103"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/nayan-patel-38803621b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:nayan27103@gmail.com"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center perspective-container">
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-600 to-cyan-500 animate-gradient-shift p-[2px]">
                <div className="w-full h-full rounded-3xl bg-[#010304]" />
              </div>

              {/* Image container */}
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden">
                <img
                  src="/artificial.png"
                  alt="Nayan Patel"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#010304]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl glass border border-cyan-500/30 animate-float">
                <span className="text-cyan-400 font-semibold text-sm">AI Engineer</span>
              </div>

              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass border border-purple-500/30 animate-float-delayed">
                <span className="text-purple-400 font-semibold text-sm">Software Developer</span>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/10 rounded-full animate-spin-slow" />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
