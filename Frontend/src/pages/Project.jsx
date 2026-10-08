import { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Code, Layers, CheckCircle, AlertTriangle, Lightbulb, ArrowRight, FileText, Target, Settings, Cpu, TestTube, TrendingUp, Eye } from 'lucide-react';
import { getAllProducts } from '../data/products';
import { useScrollReveal } from '../hooks/useUtils';

function RevealSection({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-dark">{title}</h2>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

const CHART_COLORS = ['#5B1424', '#C5A24A', '#4A3427', '#430D1A', '#766A61', '#7A2038'];

export default function Project() {
  const products = getAllProducts();

  // Category distribution data
  const categoryData = Object.entries(
    products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name: name.replace(/-/g, ' '), value }));

  // Price range data
  const priceRanges = [
    { range: '₹0-1K', count: products.filter(p => p.price < 1000).length },
    { range: '₹1K-2K', count: products.filter(p => p.price >= 1000 && p.price < 2000).length },
    { range: '₹2K-5K', count: products.filter(p => p.price >= 2000 && p.price < 5000).length },
    { range: '₹5K-10K', count: products.filter(p => p.price >= 5000 && p.price < 10000).length },
    { range: '₹10K+', count: products.filter(p => p.price >= 10000).length },
  ];

  // Collection distribution
  const collectionData = [
    { name: 'Ethnic & Suits', value: products.filter(p => ['kurtas', 'kurta-pajama', 'nehru-jackets', 'blazers', 'suits'].includes(p.category)).length },
    { name: 'Casual & Outerwear', value: products.filter(p => ['shirts', 't-shirts', 'hoodies', 'bottom-wear', 'winter-wear'].includes(p.category)).length },
    { name: 'Footwear & Accessories', value: products.filter(p => ['footwear', 'accessories'].includes(p.category)).length },
  ];

  // Dev progress data (sample)
  const devProgress = [
    { phase: 'Planning', progress: 100 },
    { phase: 'Design', progress: 100 },
    { phase: 'Frontend', progress: 100 },
    { phase: 'Testing', progress: 90 },
    { phase: 'Documentation', progress: 95 },
  ];

  const testCases = [
    { test: 'Navigation between all pages works correctly', expected: 'Smooth page transitions', actual: 'Working as expected', status: 'Pass' },
    { test: 'Search returns correct products', expected: 'Filtered product list', actual: 'Working as expected', status: 'Pass' },
    { test: 'Category filter works on collection pages', expected: 'Products filtered by category', actual: 'Working as expected', status: 'Pass' },
    { test: 'Price range filter works', expected: 'Products within range displayed', actual: 'Working as expected', status: 'Pass' },
    { test: 'Wishlist toggle adds/removes products', expected: 'Heart icon toggles, count updates', actual: 'Working as expected', status: 'Pass' },
    { test: 'Add to cart adds product with options', expected: 'Product appears in cart', actual: 'Working as expected', status: 'Pass' },
    { test: 'Cart quantity increase/decrease', expected: 'Quantity updates, total recalculates', actual: 'Working as expected', status: 'Pass' },
    { test: 'Checkout form validation', expected: 'Error messages on invalid fields', actual: 'Working as expected', status: 'Pass' },
    { test: 'Browser geolocation permission', expected: 'Browser prompts for location', actual: 'Working as expected', status: 'Pass' },
    { test: 'Location denial shows fallback', expected: 'Graceful fallback message', actual: 'Working as expected', status: 'Pass' },
    { test: 'Payment simulation completes', expected: 'Processing → Verifying → Success', actual: 'Working as expected', status: 'Pass' },
    { test: 'Dark mode toggle', expected: 'Theme switches with proper colors', actual: 'Working as expected', status: 'Pass' },
    { test: 'Mobile hamburger menu', expected: 'Drawer opens/closes smoothly', actual: 'Working as expected', status: 'Pass' },
    { test: 'Responsive layout at 390px', expected: 'No overflow, readable content', actual: 'Working as expected', status: 'Pass' },
    { test: 'Product image fallback on error', expected: 'Branded fallback placeholder', actual: 'Working as expected', status: 'Pass' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden">

        {/* Background Image */}
        <img
          src="/projectbackground.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="container-main relative z-10 text-center">

          <span className="text-gold/60 text-xs tracking-[0.3em] uppercase">
            Academic Project Documentation
          </span>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3 mb-4">
            ABHI & ABHAY<br />
            <span className="text-gold italic">
              Men's Wear Collections
            </span>
          </h1>

          <p className="text-cream/60 max-w-xl mx-auto text-sm">
            Complete technical documentation for ABHI & ABHAY COLLECTIONS —
            Men's Ethnic & Modern Fashion E-Commerce Frontend
          </p>

        </div>

      </section>

      <div className="py-10 md:py-16">
        <div className="container-main max-w-4xl mx-auto space-y-12 md:space-y-16">

          {/* Project Info Box */}
          <RevealSection>
            <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 overflow-hidden">
              <div className="bg-burgundy/5 dark:bg-burgundy/10 p-6 border-b border-border">
                <h3 className="font-serif text-lg font-semibold text-dark text-center">Project Information</h3>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Student Name', value: ['Abhishek Suresh Yadav', 'Abhay Harikishor Pandit'] },
                  { label: 'Project Title', value: 'ABHI & ABHAY - Mens Wear Collections' },
                  { label: 'Course', value: 'B.Com (Third Year)' },
                  { label: 'College', value: 'BYK College' },
                  { label: 'Technology', value: 'React + JavaScript + Tailwind CSS' },
                  { label: 'Project Type', value: 'Frontend E-Commerce Web Application' },
                  { label: 'Academic Year', value: '2026 - 27' },
                  { label: 'Total Products', value: `${products.length} products in database` },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col py-2 border-b border-border/30 last:border-0">
                    <span className="text-xs text-muted uppercase tracking-wider">{item.label}</span>
                    {Array.isArray(item.value) ? (
                      item.value.map((v, j) => (
                        <span key={j} className="text-sm font-medium text-dark mt-0.5">{v}</span>
                      ))
                    ) : (
                      <span className="text-sm font-medium text-dark mt-0.5">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Overview */}
          <RevealSection>
            <SectionTitle icon={<BookOpen size={18} className="text-burgundy" />} title="Project Overview" />
            <div className="prose-custom text-sm text-muted leading-relaxed space-y-3">
              <p>This project is a modern frontend e-commerce website designed for a men's fashion store focusing on Maharashtrian-inspired ethnic wear and contemporary menswear. The platform provides a premium shopping experience with curated collections, advanced filtering, wishlist management, cart operations, and a realistic checkout simulation.</p>
              <p>The application demonstrates the complete customer journey from product discovery through checkout, including browser-based geolocation, payment simulation, and order confirmation — all implemented as a frontend-only application using React, JavaScript, and Tailwind CSS.</p>
            </div>
          </RevealSection>

          {/* Abstract */}
          <RevealSection>
            <SectionTitle icon={<FileText size={18} className="text-burgundy" />} title="Abstract" />
            <div className="bg-cream/50 dark:bg-[#1A1614] rounded-xl p-6 text-sm text-muted leading-relaxed italic border-l-4 border-gold">
              <p>This project presents the design and implementation of a premium frontend e-commerce application for men's fashion, specifically inspired by Maharashtrian royal heritage and contemporary Indian menswear. Built using React.js with JavaScript and Tailwind CSS, the application features a comprehensive product catalog sourced from a local JSON database, advanced search and filtering capabilities, wishlist management, shopping cart functionality, a multi-step checkout process with browser geolocation integration, and a realistic payment simulation system. The project demonstrates modern frontend development practices including component-based architecture, state management, responsive design, dark mode theming, and smooth user interactions — all without requiring any backend infrastructure.</p>
            </div>
          </RevealSection>

          {/* Introduction */}
          <RevealSection>
            <SectionTitle icon={<Lightbulb size={18} className="text-burgundy" />} title="Introduction" />
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <p>The digital transformation of fashion retail has created unprecedented opportunities for brands to connect with customers online. In India, the men's fashion market is experiencing rapid growth, driven by increasing digital literacy, smartphone adoption, and a growing appreciation for quality menswear.</p>
              <p>This project addresses the need for an organized, visually compelling online menswear experience that combines traditional Indian heritage with modern e-commerce functionality. The application serves as both a technical demonstration of frontend capabilities and a showcase of culturally-inspired design principles.</p>
            </div>
          </RevealSection>

          {/* Problem Statement */}
          <RevealSection>
            <SectionTitle icon={<AlertTriangle size={18} className="text-burgundy" />} title="Problem Statement" />
            <ul className="space-y-2 text-sm text-muted">
              {[
                'Limited digital presence for traditional Indian menswear brands',
                'Difficulty in discovering and browsing heritage-inspired products online',
                'Fragmented product categories across different platforms',
                'Poor catalogue experience with inconsistent product information',
                'Inconvenient customer communication channels',
                'Lack of modern, premium user experience in ethnic wear shopping',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-burgundy mt-1">•</span> {item}
                </li>
              ))}
            </ul>
          </RevealSection>

          {/* Objectives */}
          <RevealSection>
            <SectionTitle icon={<Target size={18} className="text-burgundy" />} title="Objectives" />
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Build responsive e-commerce frontend',
                'Organize menswear into clear collections',
                'Provide search and filtering system',
                'Implement detailed product views',
                'Create wishlist functionality',
                'Build shopping cart system',
                'Simulate checkout process',
                'Simulate payment gateway',
                'Integrate browser geolocation',
                'Create heritage-inspired branding',
                'Implement dark/light mode',
                'Provide academic documentation',
              ].map((obj, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted bg-cream/50 dark:bg-[#1A1614] p-3 rounded-lg">
                  <CheckCircle size={14} className="text-gold flex-shrink-0" /> {obj}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Scope */}
          <RevealSection>
            <SectionTitle icon={<Eye size={18} className="text-burgundy" />} title="Scope" />
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <p><strong className="text-dark">Frontend Scope:</strong> Product browsing, categories, search, filtering, sorting, wishlist, cart, checkout UI, location permission, payment simulation, account UI, responsive design, and theme switching.</p>
              <p className="text-xs bg-cream/50 dark:bg-[#1A1614] p-3 rounded-lg"><strong>Note:</strong> This application is frontend-only. No backend server, database, or API is implemented. Product data is sourced from a local JSON file (database.json).</p>
            </div>
          </RevealSection>

          {/* Technology Stack */}
          <RevealSection>
            <SectionTitle icon={<Cpu size={18} className="text-burgundy" />} title="Technology Stack" />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { cat: 'Frontend Framework', items: ['React 19', 'JavaScript (JSX)'] },
                { cat: 'Styling', items: ['Tailwind CSS v4'] },
                { cat: 'Build Tool', items: ['Vite'] },
                { cat: 'Routing', items: ['React Router v7'] },
                { cat: 'Icons', items: ['Lucide React'] },
                { cat: 'Charts', items: ['Recharts'] },
                { cat: 'Data Source', items: ['database.json (60 products)'] },
                { cat: 'Browser APIs', items: ['Geolocation API', 'localStorage'] },
              ].map((tech, i) => (
                <div key={i} className="bg-white dark:bg-[#231F1B] rounded-lg border border-border/50 p-4">
                  <h4 className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">{tech.cat}</h4>
                  {tech.items.map((item, j) => (
                    <p key={j} className="text-sm text-dark">{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Component Architecture */}
          <RevealSection>
            <SectionTitle icon={<Layers size={18} className="text-burgundy" />} title="Component Architecture" />
            <div className="bg-cream/50 dark:bg-[#1A1614] rounded-xl p-6 text-sm text-muted font-mono leading-loose">
              <pre className="whitespace-pre-wrap">{`React App
├── Header (AnnouncementBar + Navigation)
├── Pages
│   ├── Home (Hero + Heritage + Collections + Products + CTA)
│   ├── EthnicSuits (CollectionPage)
│   ├── CasualOuterwear (CollectionPage)
│   ├── FootwearAccessories (CollectionPage)
│   ├── ProductDetail (Gallery + Info + Tabs + Related)
│   ├── Wishlist
│   ├── Cart
│   ├── Checkout (4-step: Info → Address → Location → Payment)
│   ├── OrderConfirmation
│   ├── About
│   ├── Contact
│   ├── Project (Documentation + Charts)
│   ├── SignIn / SignUp
│   └── SearchResults
├── Shared Components
│   ├── ProductCard
│   ├── FilterSidebar
│   ├── CartDrawer
│   ├── Notification
│   └── CollectionPage
├── Store (useReducer + Context)
│   └── Cart / Wishlist / Theme / Auth / Orders
├── Data Layer
│   └── database.json → products.js
└── Footer`}</pre>
            </div>
          </RevealSection>

          {/* System Flow */}
          <RevealSection>
            <SectionTitle icon={<Settings size={18} className="text-burgundy" />} title="System Analysis — User Flow" />
            <div className="flex flex-wrap items-center justify-center gap-2 py-6">
              {['Home', 'Collection', 'Product', 'Details', 'Wishlist/Cart', 'Checkout', 'Location', 'Payment', 'Confirmation'].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-burgundy text-white text-xs rounded-lg font-medium">{step}</span>
                  {i < 8 && <ArrowRight size={14} className="text-gold" />}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Testing */}
          <RevealSection>
            <SectionTitle icon={<TestTube size={18} className="text-burgundy" />} title="Testing" />
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-burgundy text-white">
                    <th className="px-4 py-3 text-left font-medium">Test Case</th>
                    <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Expected Result</th>
                    <th className="px-4 py-3 text-center font-medium w-20">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white dark:bg-[#231F1B]">
                  {testCases.map((tc, i) => (
                    <tr key={i} className="hover:bg-cream/30">
                      <td className="px-4 py-3 text-dark">{tc.test}</td>
                      <td className="px-4 py-3 text-muted hidden md:table-cell">{tc.expected}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 bg-success/10 text-success text-xs rounded font-medium">
                          ✓ {tc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>

          {/* Analytics Charts */}
          <RevealSection>
            <SectionTitle icon={<TrendingUp size={18} className="text-burgundy" />} title="Project Analytics" subtitle="Sample / Demonstration Data" />
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-5">
                <h4 className="text-sm font-semibold text-dark mb-4">Product Category Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCCDBB" />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#5B1424" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Collection Pie */}
              <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-5">
                <h4 className="text-sm font-semibold text-dark mb-4">Collection Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={collectionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {collectionData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Price Range */}
              <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-5">
                <h4 className="text-sm font-semibold text-dark mb-4">Price Range Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={priceRanges}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#DCCDBB" />
                    <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#C5A24A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Dev Progress */}
              <div className="bg-white dark:bg-[#231F1B] rounded-xl border border-border/50 p-5">
                <h4 className="text-sm font-semibold text-dark mb-4">Development Phase Progress</h4>
                <div className="space-y-4 mt-6">
                  {devProgress.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">{item.phase}</span>
                        <span className="font-medium text-dark">{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-cream dark:bg-[#1A1614] rounded-full overflow-hidden">
                        <div className="h-full bg-burgundy rounded-full transition-all" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Challenges */}
          <RevealSection>
            <SectionTitle icon={<AlertTriangle size={18} className="text-burgundy" />} title="Challenges" />
            <ul className="space-y-3 text-sm text-muted">
              {[
                'Maintaining consistent responsive layouts across all breakpoints without backend data',
                'Keeping product cards visually balanced with varying content lengths',
                'Managing dynamic filter state across multiple filter types simultaneously',
                'Implementing fallback images gracefully when product images are unavailable',
                'Making the checkout experience feel realistic without actual backend processing',
                'Handling browser geolocation permissions and denial gracefully',
                'Maintaining design consistency between light and dark mode themes',
                'Balancing heritage visual aesthetics with modern UX expectations',
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2 bg-cream/50 dark:bg-[#1A1614] p-3 rounded-lg">
                  <AlertTriangle size={14} className="text-warning mt-0.5 flex-shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </RevealSection>

          {/* Limitations */}
          <RevealSection>
            <SectionTitle icon={<AlertTriangle size={18} className="text-burgundy" />} title="Limitations" />
            <div className="bg-cream/50 dark:bg-[#1A1614] rounded-xl p-6 space-y-2 text-sm text-muted">
              {[
                'Frontend-only — no server-side processing or persistent database',
                'No real order database — orders are stored in browser localStorage only',
                'No actual payment processing — all payments are simulated',
                'No real inventory management — stock counts are static',
                'Location is browser-based geolocation, not integrated with delivery services',
                'Authentication is demo/frontend-only without real account persistence',
                'Product data is sourced from local database.json (mock data)',
                'No real-time product image hosting — uses placeholder fallbacks',
              ].map((l, i) => (
                <p key={i} className="flex items-start gap-2"><span className="text-error">•</span> {l}</p>
              ))}
            </div>
          </RevealSection>

          {/* Future Scope */}
          <RevealSection>
            <SectionTitle icon={<Lightbulb size={18} className="text-burgundy" />} title="Future Scope" />
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Backend integration (Node.js / Express)',
                'Real database (MongoDB / PostgreSQL)',
                'User authentication (JWT / OAuth)',
                'Real payment gateway (Razorpay / Stripe)',
                'Order management system',
                'Admin dashboard',
                'Inventory management',
                'Shipping & tracking integration',
                'Customer notifications (email/SMS)',
                'Reviews & ratings database',
                'AI recommendation engine',
                'Analytics dashboard',
                'Real address/location integration',
                'PWA (Progressive Web App) support',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted bg-white dark:bg-[#231F1B] p-3 rounded-lg border border-border/30">
                  <ArrowRight size={12} className="text-gold flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Conclusion */}
          <RevealSection>
            <SectionTitle icon={<BookOpen size={18} className="text-burgundy" />} title="Conclusion" />
            <div className="text-sm text-muted leading-relaxed space-y-3 border-l-4 border-gold pl-6">
              <p>This project successfully demonstrates the design and implementation of a modern, premium frontend e-commerce experience for men's fashion. By combining Maharashtrian heritage aesthetics with contemporary web development practices, the application showcases how cultural identity can be seamlessly integrated into digital commerce.</p>
              <p>The implementation covers a comprehensive feature set including product browsing, search, filtering, wishlist management, shopping cart, multi-step checkout with geolocation, payment simulation, and theme switching — all achieved through frontend technologies alone.</p>
              <p>The project serves as a strong foundation for future full-stack development and demonstrates competency in React component architecture, state management, responsive design, and user experience principles. It stands as evidence that a frontend-only application can deliver a compelling, realistic e-commerce experience suitable for academic demonstration, portfolio presentation, and client showcasing.</p>
            </div>
          </RevealSection>

        </div>
      </div>
    </div>
  );
}
