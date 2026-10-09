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
              <h3 className="font-serif text-xl font-bold text-gold">RK</h3>
              <p className="text-[10px] tracking-[0.25em] text-cream/60 uppercase">Collections</p>
            </Link>
            <p className="text-sm text-cream/70 leading-relaxed mb-6 max-w-xs">
              Premium women's fashion collection. Blending Indian heritage with contemporary styling for the modern woman.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919819263483"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:ramyadav80929@gmail.com"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
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
                { label: 'Sarees', path: '/sarees' },
                { label: 'Dresses', path: '/dresses' },
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
                { label: 'Sarees', path: '/sarees' },
                { label: 'Ethnic Sarees', path: '/sarees' },
                { label: 'Dresses & Gowns', path: '/dresses' },
                { label: 'Anarkali & Maxi', path: '/dresses' },
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
                  <a href="tel:9819263483" className="text-sm text-cream/70 hover:text-gold transition-colors block">98192 63483</a>
                  <a href="tel:9175940227" className="text-sm text-cream/70 hover:text-gold transition-colors block">91759 40227</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/919819263483"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-gold transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <a href="mailto:ramyadav80929@gmail.com" className="text-sm text-cream/70 hover:text-gold transition-colors break-all">
                  ramyadav80929@gmail.com
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
            © {currentYear} RK COLLECTIONS. All Rights Reserved.
          </p>
          <p className="text-xs text-cream/40">
            Premium Women's Fashion Collection
          </p>
        </div>
      </div>
    </footer>
  );
}
