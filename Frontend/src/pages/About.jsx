import { Link } from 'react-router-dom';
import { Crown, Gem, Heart, Award, Sparkles, ArrowRight, Shield, Users } from 'lucide-react';
import { useScrollReveal } from '../hooks/useUtils';

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden">

        {/* Background Image */}
        <img
          src="AboutBackground.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Existing Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C5A24A' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Content */}
        <div className="container-main relative z-10 text-center">

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-gold/40" />
            <Crown size={16} className="text-gold" />
            <div className="w-10 h-px bg-gold/40" />
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            OUR STORY —<br />
            <span className="text-gold italic">
              The Thread of Indian Heritage
            </span>
          </h1>

          <p className="text-cream/60 max-w-xl mx-auto text-sm md:text-base">
            "Tradition, craftsmanship, and an evolved sense of elegance woven into modern women's fashion."
          </p>

        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-main">
          <RevealSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 group">

                {/* Image */}
                <img
                  src="/TradtoMord.png"
                  alt="Heritage Story"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
                  From Tradition to the<br /><span className="text-burgundy">Modern Wardrobe</span>
                </h2>
                <div className="space-y-4 text-muted leading-relaxed text-sm md:text-base">
                  <p>
                    RK COLLECTIONS was born from a deep reverence for Indian heritage and a passion for exceptional women's fashion. Our journey began with a simple vision: to bring the grandeur of traditional Indian craftsmanship to the modern woman's wardrobe.
                  </p>
                  <p>
                    Inspired by the rich legacy of Paithani fabrics, Banarasi weaves, and the timeless beauty of Indian textile traditions, we craft each garment to honor centuries of artisanal tradition while embracing contemporary silhouettes and styles.
                  </p>
                  <p>
                    From elegant sarees to modern designer dresses, every piece tells a story of heritage reimagined. We work with skilled artisans who understand the fine balance between traditional techniques and modern expectations, ensuring that each garment is worthy of life's most elegant moments.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-cream/50 dark:bg-[#1E1A16]">
        <div className="container-main">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="ornament-divider mb-4"><div className="ornament-diamond" /></div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">Our Philosophy</h2>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Award size={28} />, title: 'Authentic Craftsmanship', desc: 'Every garment is crafted using time-honored techniques passed down through generations of skilled artisans. We preserve traditional methods while meeting modern standards of quality.' },
              { icon: <Shield size={28} />, title: 'Fair & Transparent Pricing', desc: 'We believe premium women\'s fashion should be accessible. Our direct-to-customer approach ensures you get exceptional value without compromising on fabric quality or finishing.' },
              { icon: <Heart size={28} />, title: 'Personal Customer Service', desc: 'From styling advice to post-purchase care, our dedicated team ensures every interaction reflects the personalized attention our customers deserve.' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-8 text-center hover:shadow-md transition-shadow">
                  <div className="text-gold mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-serif text-lg font-semibold text-dark mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-main max-w-3xl mx-auto">
          <RevealSection>
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">A Heritage Journey</h2>
              <p className="text-muted mt-2 text-sm">The evolution of tradition into modern style</p>
            </div>
          </RevealSection>

          <div className="space-y-0">
            {[
              { title: 'Heritage', desc: 'Drawing from centuries of Indian textile tradition and royal aesthetics of Paithani, Banarasi, and Kanjeevaram weaves.', icon: <Crown size={20} /> },
              { title: 'Craft', desc: 'Partnering with skilled artisans who master traditional weaving, embroidery, and garment finishing.', icon: <Gem size={20} /> },
              { title: 'Modern Design', desc: 'Reimagining traditional silhouettes with contemporary cuts, styles, and finishing.', icon: <Sparkles size={20} /> },
              { title: 'Contemporary Women\'s Wear', desc: 'Delivering a curated collection that bridges heritage and modern lifestyle.', icon: <Users size={20} /> },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="flex gap-6 py-8 border-b border-border last:border-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    {i < 3 && <div className="w-px h-full bg-border mt-2" />}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-burgundy to-maroon">
        <div className="container-main text-center">
          <RevealSection>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the <span className="text-gold italic">Collection</span>
            </h2>
            <p className="text-cream/60 max-w-md mx-auto mb-8 text-sm">
              Discover women's fashion that honors tradition while embracing the modern woman's lifestyle.
            </p>
            <Link to="/sarees" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all">
              EXPLORE COLLECTION <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
