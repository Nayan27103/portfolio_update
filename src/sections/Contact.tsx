import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('access_key', '9b9bbd80-e71e-43f3-b055-203ca9ce7a45');
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);
      formData.append('from_name', 'Nayan Patel Portfolio');
      formData.append('subject', `New Message from ${formState.name} on Portfolio`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        alert(data.message || 'Check submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }

    // Reset success flag after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-4">
              Let's Connect
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Rajdhani'] mb-6">
              INITIATE <span className="text-gradient">CONTACT</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Have a project in mind? Let's compile the future together.
              I'm always open to discussing new opportunities and innovative ideas.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2 space-y-8 contact-content">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 font-['Rajdhani']">
                  Get In Touch
                </h3>
                <p className="text-white/60 mb-8">
                  Whether you're looking for a developer, have a question, or just want to connect,
                  I'd love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <a
                  href="mailto:nayan27103@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">
                      nayan27103@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919165814637"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">
                      +91 9165814637
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <MapPin className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white">Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-white/60 text-sm mb-4">Follow me on</p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Nayan27103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nayan-patel-38803621b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:col-span-3 contact-content">
              <div className="relative p-8 rounded-2xl glass border border-white/10">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-white/40 text-sm font-mono">
                    contact_form.exe
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="text-green-400" size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-['Rajdhani']">
                      Message Sent!
                    </h4>
                    <p className="text-white/60">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-cyan-400 text-sm font-mono mb-2">
                          <span className="text-purple-400">const</span> name =
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          placeholder="'Your Name'"
                          className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-cyan-400 text-sm font-mono mb-2">
                          <span className="text-purple-400">const</span> email =
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          placeholder="'your@email.com'"
                          className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cyan-400 text-sm font-mono mb-2">
                        <span className="text-purple-400">const</span> message =
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="'Your message here...'"
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          SEND_SIGNAL
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 border border-cyan-500/20 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-purple-500/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
