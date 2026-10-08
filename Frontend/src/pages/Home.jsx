import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Gem, Shirt, Star, ShoppingBag, CheckCircle, Award, Heart, Sparkles } from 'lucide-react';
import { getFeaturedProducts, getNewProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useScrollReveal } from '../hooks/useUtils';

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);
  const newArrivals = getNewProducts().slice(0, 4);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[700px] overflow-hidden">

        {/* HERO BACKGROUND IMAGE */}
        <img
          src="/hero image.png"
          alt="Women's Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Optional Burgundy Overlay */}
        <div className="absolute inset-0 bg-[#430D1A]/20" />

        {/* Decorative overlay pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A24A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold/30 m-6 hidden lg:block" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold/30 m-6 hidden lg:block" />

        {/* ===== CONTENT OVER IMAGE ===== */}
        <div className="container-main relative z-10 min-h-[700px] flex items-center justify-center py-20">
          <div className="max-w-3xl mx-auto text-center">

            {/* Ornamental top */}
            <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />

              <Gem size={14} className="text-gold" />

              <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-sans">
                Premium Indian Women's Wear
              </span>

              <Gem size={14} className="text-gold" />

              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            {/* HERO TITLE */}
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in"
              style={{ animationDelay: "0.15s" }}
            >
              Where Elegance Meets{" "}
              <span className="text-gold italic">
                Modern Grace
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Timeless Indian women's fashion crafted for weddings,
              celebrations and every elegant occasion.
            </p>

            {/* BUTTONS */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in"
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                to="/sarees"
                className="group flex items-center gap-2 px-8 py-3.5 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 text-sm tracking-wide"
              >
                EXPLORE SAREES

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/dresses"
                className="flex items-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm tracking-wide"
              >
                VIEW ALL COLLECTIONS
              </Link>
            </div>

            {/* TRUST INDICATORS */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                {
                  icon: <Crown size={16} />,
                  text: "Premium Indian Craftsmanship",
                },
                {
                  icon: <Shirt size={16} />,
                  text: "Curated Women's Wear",
                },
                {
                  icon: <Sparkles size={16} />,
                  text: "Modern Elegant Styling",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/70 text-xs tracking-wide"
                >
                  <span className="text-gold">
                    {item.icon}
                  </span>

                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM GRADIENT */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F1E7] to-transparent" />

      </section>

      {/* ===== HERITAGE INTRO ===== */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <RevealSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center ">
              {/* Image side */}
              <div className="relative">

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream border border-border/50">

                  {/* Image */}
                  <img
                    src="/using image.png"
                    alt="RK Collections"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                </div>

                {/* Decorative Frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/20 rounded-2xl -z-10 hidden md:block" />

              </div>

              {/* Story side */}
              <div>
                <div className="ornament-divider mb-6 justify-start">
                  <div className="ornament-diamond"></div>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight">
                  THE ART OF<br />
                  <span className="text-burgundy">INDIAN WOMEN'S FASHION</span>
                </h2>
                <div className="space-y-4 text-muted leading-relaxed text-sm md:text-base">
                  <p>
                    Inspired by the grandeur of Paithani-woven fabrics and the timeless elegance of Indian textile heritage, RK COLLECTIONS brings you women's fashion that bridges centuries of tradition with contemporary styling.
                  </p>
                  <p>
                    Every piece in our collection tells a story — from the intricate patterns of Banarasi silk to the regal silhouettes inspired by Indian royalty. We blend time-honored craftsmanship with modern designs to create clothing worthy of life's most elegant moments.
                  </p>
                  <p>
                    Our artisans draw from a rich legacy of textile heritage, ensuring that each garment carries the essence of authentic Indian women's fashion while meeting the standards of contemporary style.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-16 h-px bg-gold" />
                  <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">Est. 2024</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-16 md:py-24 bg-cream/50 dark:bg-[#1E1A16]">
        <div className="container-main">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="ornament-divider mb-4">
                <div className="ornament-diamond" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-3">
                Our Collections
              </h2>
              <p className="text-muted max-w-lg mx-auto text-sm md:text-base">
                Explore curated collections designed for the modern Indian woman
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Sarees',
                desc: 'Exquisite Paithani, Banarasi, Kanjeevaram, and designer sarees for weddings and festive occasions.',
                path: '/sarees',
                image: '/Ethic.jpg',
                icon: <Crown size={28} />,
              },
              {
                title: 'Dresses',
                desc: 'Premium Anarkali dresses, gowns, maxi dresses, and evening wear for every occasion.',
                path: '/dresses',
                image: '/casual.webp',
                icon: <Shirt size={28} />,
              },
              {
                title: 'Footwear & Accessories',
                desc: 'Traditional juttis, kolhapuri sandals, elegant heels, clutches, jewelry, and refined accessories.',
                path: '/footwear-accessories',
                image: '/accesoriess iamge.png',
                icon: <Gem size={28} />,
              },
            ].map((collection, i) => (
              <RevealSection key={i} delay={i * 150}>
                <Link
                  to={collection.path}
                  className="group block relative overflow-hidden rounded-2xl border border-border/50 bg-white dark:bg-[#231F1B] hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >

                  {/* Collection Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">

                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/70 group-hover:text-gold transition-all duration-500 group-hover:scale-110">
                        {collection.icon}
                      </div>
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <h3 className="font-serif text-xl font-semibold text-dark mb-2 group-hover:text-burgundy transition-colors">
                      {collection.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {collection.desc}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy group-hover:text-maroon transition-colors">
                      Explore Collection
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>

                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 md:py-24">
        <div className="container-main">
          <RevealSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="ornament-divider mb-4 justify-start">
                  <div className="ornament-diamond" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">
                  Featured Products
                </h2>
                <p className="text-muted text-sm mt-2">Handpicked selections for the discerning woman</p>
              </div>
              <Link
                to="/sarees"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-burgundy hover:text-maroon transition-colors"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/sarees"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-burgundy hover:text-maroon"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ROYAL ETHNIC STORY ===== */}
      <section className="py-20 md:py-28 bg-maroon relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C5A24A' fill-opacity='0.5'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container-main relative z-10">
          <RevealSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                <Crown size={20} className="text-gold" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Made for Moments<br />
                <span className="text-gold italic">That Matter</span>
              </h2>
              <p className="text-cream/60 max-w-xl mx-auto mb-10 leading-relaxed">
                From wedding ceremonies to family celebrations, our collection ensures you make an unforgettable impression at every significant occasion.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Silk Sarees', icon: '👑' },
                { name: 'Banarasi', icon: '🎭' },
                { name: 'Anarkali', icon: '✨' },
                { name: 'Designer Gowns', icon: '🏛️' },
                { name: 'Bridal Wear', icon: '💎' },
              ].map((item, i) => (
                <Link
                  key={i}
                  to="/sarees"
                  className="group flex flex-col items-center p-6 rounded-xl border border-cream/10 hover:border-gold/30 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-2xl mb-3">{item.icon}</span>
                  <span className="text-sm font-medium text-cream/80 group-hover:text-gold transition-colors text-center">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ===== SHOPPING EXPERIENCE ===== */}
      <section className="py-16 md:py-24">
        <div className="container-main">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="ornament-divider mb-4">
                <div className="ornament-diamond" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-3">
                The Experience
              </h2>
              <p className="text-muted text-sm">Your journey to royal styling, simplified</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: '01', title: 'Discover', desc: 'Browse our curated collections', icon: <Search size={24} /> },
              { step: '02', title: 'Choose', desc: 'Select your perfect style', icon: <Heart size={24} /> },
              { step: '03', title: 'Order', desc: 'Seamless checkout experience', icon: <ShoppingBag size={24} /> },
              { step: '04', title: 'Confirm', desc: 'Delivered to your doorstep', icon: <CheckCircle size={24} /> },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream dark:bg-[#231F1B] border border-border flex items-center justify-center mx-auto mb-5 group-hover:bg-burgundy group-hover:border-burgundy transition-all duration-300">
                    <span className="text-burgundy group-hover:text-white transition-colors">{item.icon}</span>
                  </div>
                  <span className="text-gold font-serif text-lg font-bold">{item.step}</span>
                  <h3 className="font-serif text-lg font-semibold text-dark mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST / BRAND PROMISE ===== */}
      <section className="py-16 md:py-20 bg-cream/50 dark:bg-[#1E1A16]">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Award size={28} />, title: 'Authentic Indian Craft', desc: 'Rooted in traditional Indian textile heritage' },
              { icon: <Gem size={28} />, title: 'Premium Fabrics', desc: 'Carefully sourced materials for lasting quality' },
              { icon: <Sparkles size={28} />, title: 'Elegant Finishing', desc: 'Precision stitching and attention to detail' },
              { icon: <Heart size={28} />, title: 'Customer-first Service', desc: 'Dedicated support for a seamless experience' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-6 md:p-8 text-center hover:shadow-md transition-shadow">
                  <div className="text-gold mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-serif text-base md:text-lg font-semibold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-burgundy to-maroon relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C5A24A' fill-opacity='0.3'%3E%3Cpath d='M20 20l-4-4 4-4 4 4zM0 20l-4-4 4-4 4 4zM40 20l-4-4 4-4 4 4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container-main relative z-10 text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold/40" />
              <Gem size={14} className="text-gold" />
              <div className="w-10 h-px bg-gold/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Your Next Elegant Look<br />
              <span className="text-gold italic">Begins Here</span>
            </h2>
            <p className="text-cream/60 max-w-md mx-auto mb-10">
              Discover the perfect blend of Indian heritage and contemporary women's fashion.
            </p>
            <Link
              to="/sarees"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 text-sm tracking-wider"
            >
              EXPLORE COLLECTION
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

function Search({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
