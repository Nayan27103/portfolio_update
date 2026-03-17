import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e10] to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600" />
                  <span className="relative text-white font-bold text-xl font-['Rajdhani']">N</span>
                </div>
                <div>
                  <span className="text-white font-bold text-xl font-['Rajdhani'] block">
                    Nayan Patel
                  </span>
                  <span className="text-cyan-400 text-sm">Software Developer</span>
                </div>
              </a>
              <p className="text-white/60 max-w-md mb-6">
                Crafting intelligent systems and automation workflows.
                Let's build something amazing together.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://github.com/Nayan27103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nayan-patel-38803621b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:nayan27103@gmail.com"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-['Rajdhani']">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white/60 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-['Rajdhani']">Contact</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a href="mailto:nayan27103@gmail.com" className="hover:text-cyan-400 transition-colors">
                    nayan27103@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919165814637" className="hover:text-cyan-400 transition-colors">
                    +91 9165814637
                  </a>
                </li>
                <li>Indore, Madhya Pradesh</li>
                <li>India</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
