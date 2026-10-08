import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon text-cream">
      {/* Main Footer */}
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="font-serif text-xl font-bold text-gold">ABHI & ABHAY</h3>
              <p className="text-[10px] tracking-[0.25em] text-cream/60 uppercase">Collections</p>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed mb-6 max-w-xs">
              Premium Maharashtrian-inspired men's fashion. Blending royal heritage with contemporary styling for the modern gentleman.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917588617780"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:abhishek.himeself@gmail.com"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.instagram.com/_.abhi_000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Ethnic & Suits', path: '/ethnic-suits' },
                { label: 'Casual & Outerwear', path: '/casual-outerwear' },
                { label: 'Footwear & Accessories', path: '/footwear-accessories' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Project', path: '/project' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Ethnic Wear', path: '/ethnic-suits' },
                { label: 'Suits & Blazers', path: '/ethnic-suits' },
                { label: 'Casual Wear', path: '/casual-outerwear' },
                { label: 'Outerwear', path: '/casual-outerwear' },
                { label: 'Footwear', path: '/footwear-accessories' },
                { label: 'Accessories', path: '/footwear-accessories' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:7588617780" className="text-sm text-cream/70 hover:text-gold transition-colors block">7588617780</a>
                  <a href="tel:9665577399" className="text-sm text-cream/70 hover:text-gold transition-colors block">96655 77399</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/917588617780"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a href="mailto:abhishek.himeself@gmail.com" className="text-sm text-cream/70 hover:text-gold transition-colors break-all">
                  abhishek.himeself@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-cream/70 leading-relaxed">
                  Flat no. B14, Neelkanth Residency,
                  Behind Negal Park, Shivaji Nagar,
                  Satpur, Nashik
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/50 text-center sm:text-left">
            © {currentYear} ABHI & ABHAY COLLECTIONS. All Rights Reserved.
          </p>
          <p className="text-xs text-cream/40">
            Premium Maharashtrian Men's Fashion
          </p>
        </div>
      </div>
    </footer>
  );
}
