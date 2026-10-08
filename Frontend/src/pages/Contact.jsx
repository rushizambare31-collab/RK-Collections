import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, ExternalLink, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useUtils';

function RevealSection({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 bottom-3 relative overflow-hidden">

        {/* Background Image */}
        <img
          src="/contactback.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0" />

        {/* Existing Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C5A24A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="container-main relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            LET'S CONNECT
          </h1>

          <p className="text-cream/60 max-w-lg mx-auto">
            Visit our collection, speak with us or reach out for assistance.
          </p>
        </div>

      </section>

      {/* Contact Actions */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <RevealSection>
            <div className="grid md:grid-cols-3 gap-6 -mt-16 relative z-10">
              <a href="tel:7588617780" className="group bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-burgundy transition-colors">
                  <Phone size={22} className="text-burgundy group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-dark mb-1">Call Now</h3>
                <p className="text-sm text-muted">7588617780</p>
                <p className="text-sm text-muted">96655 77399</p>
              </a>
              <a href="https://wa.me/917588617780" target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-success transition-colors">
                  <MessageCircle size={22} className="text-success group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-dark mb-1">WhatsApp</h3>
                <p className="text-sm text-muted">Chat with us instantly</p>
              </a>
              <a href="mailto:rkcollections.info@gmail.com" className="group bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors">
                  <Mail size={22} className="text-gold group-hover:text-dark transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-dark mb-1">Email Us</h3>
                <p className="text-sm text-muted break-all">rkcollections.info@gmail.com</p>
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-10 md:py-16">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            {/* Info */}
            <RevealSection>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-burgundy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-dark mb-1">Visit Us</h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Flat no. B14, Neelkanth Residency,<br />
                        Behind Negal Park, Shivaji Nagar,<br />
                        Satpur, Nashik
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-burgundy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-dark mb-1">Call Us</h4>
                      <a href="tel:7588617780" className="text-sm text-muted hover:text-burgundy block">7588617780</a>
                      <a href="tel:9665577399" className="text-sm text-muted hover:text-burgundy block">96655 77399</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-burgundy" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold text-dark mb-1">Email</h4>
                      <a href="mailto:rkcollections.info@gmail.com" className="text-sm text-muted hover:text-burgundy">rkcollections.info@gmail.com</a>
                      <a href="mailto:rkcollections.info@gmail.com" className="text-sm text-muted hover:text-burgundy">rkcollections.support@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-burgundy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-dark mb-1">Business Hours</h4>
                      <p className="text-sm text-muted">Mon–Sat: 10:00 AM – 8:00 PM</p>
                      <p className="text-sm text-muted">Sunday: 11:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Form */}
            <RevealSection delay={150}>
              <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle size={48} className="text-success mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-dark mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                      className="text-sm text-burgundy hover:underline">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="font-serif text-xl font-semibold text-dark mb-2">Send a Message</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={`w-full px-4 py-2.5 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy ${errors.name ? 'border-error' : 'border-border'}`} placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Email *</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={`w-full px-4 py-2.5 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy ${errors.email ? 'border-error' : 'border-border'}`} placeholder="Your email" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Phone</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Phone number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-1.5">Subject</label>
                        <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-2.5 bg-cream/50 dark:bg-[#1A1614] border border-border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy" placeholder="Subject" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1.5">Message *</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4}
                        className={`w-full px-4 py-2.5 bg-cream/50 dark:bg-[#1A1614] border rounded-lg text-sm text-dark focus:outline-none focus:border-burgundy resize-none ${errors.message ? 'border-error' : 'border-border'}`} placeholder="Your message..." />
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 w-full py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-maroon transition-colors">
                      <Send size={16} /> SEND MESSAGE
                    </button>
                    <p className="text-[10px] text-muted text-center">This is a frontend demonstration. No actual email will be sent.</p>
                  </form>
                )}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 bg-cream/50 dark:bg-[#1E1A16]">
        <div className="container-main">
          <RevealSection>
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-2">Our Location</h2>
              <p className="text-sm text-muted">Find us in Nashik, Maharashtra</p>
            </div>
            <div
              className="rounded-xl overflow-hidden border border-border/50 h-64 md:h-80 flex items-center justify-center relative bg-cover bg-center"
              style={{
                backgroundImage: "url('/Location.png')",
              }}
            >
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <MapPin size={40} className="text-white/80 mx-auto mb-3" /> 

                <p className="text-sm text-white mb-4">
                  Nashik, Maharashtra, India
                </p>

                <a
                  href="https://www.google.com/maps/search/Flat+no+B14+Neelkanth+Residency+Behind+Negal+Park+Shivaji+Nagar+Satpur+Nashik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-burgundy text-white rounded-lg text-sm font-medium hover:bg-maroon transition-colors"
                >
                  <ExternalLink size={14} />
                  OPEN IN GOOGLE MAPS
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
