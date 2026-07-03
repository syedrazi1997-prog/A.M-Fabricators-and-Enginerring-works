import { ArrowRight, Phone, MapPin, Award, Clock, Shield } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Main Hero */}
      <div
        className="relative min-h-[88vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)',
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative shapes */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
          <div
            className="absolute right-10 top-20 w-72 h-72 border-4 border-amber-400 rotate-12"
            style={{ borderStyle: 'solid' }}
          />
          <div
            className="absolute right-32 top-40 w-48 h-48 border-2 border-amber-300 -rotate-6"
            style={{ borderStyle: 'dashed' }}
          />
          <div className="absolute right-4 bottom-20 w-32 h-32 bg-amber-500 opacity-20 rotate-45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              IDA Nacharam, Hyderabad
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              A.M FABRICATORS
              <span className="block text-amber-400">ENGINEERING</span>
              <span className="block text-steel-300 text-3xl md:text-4xl">WORKS</span>
            </h1>

            <p className="text-steel-300 text-lg leading-relaxed mb-8 max-w-lg">
              Premium iron fabrication solutions — gates, grills, railings, staircases, and industrial structures.
              Custom measurements, professional finish, delivered across Hyderabad.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('products')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-steel-900 font-bold px-6 py-3 rounded transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Browse Products
                <ArrowRight size={18} />
              </button>
              <a
                href="tel:+917386381729"
                className="flex items-center gap-2 border-2 border-steel-400 hover:border-amber-400 text-steel-200 hover:text-amber-400 font-semibold px-6 py-3 rounded transition-all duration-200"
              >
                <Phone size={18} />
                Get a Quote
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: '500+', label: 'Projects Done' },
                { val: '15+', label: 'Years Experience' },
                { val: '100%', label: 'Custom Made' },
              ].map((s) => (
                <div key={s.label} className="text-center border border-steel-600 rounded-lg p-3">
                  <div className="font-display text-2xl font-bold text-amber-400">{s.val}</div>
                  <div className="text-steel-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              {
                icon: Award,
                title: 'Quality Assured',
                desc: 'ISI certified MS iron, TIG/MIG welding, premium powder coat finish',
                img: 'https://images.pexels.com/photos/18143352/pexels-photo-18143352.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                icon: Shield,
                title: 'Durable & Strong',
                desc: 'Anti-rust treatment, heavy-duty construction for decades of service',
                img: 'https://images.pexels.com/photos/15501345/pexels-photo-15501345.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                icon: Clock,
                title: 'On-Time Delivery',
                desc: 'Committed delivery schedules, free installation across Hyderabad',
                img: 'https://images.pexels.com/photos/11740803/pexels-photo-11740803.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              {
                icon: MapPin,
                title: 'Local Experts',
                desc: 'Based in IDA Nacharam — serving all of Hyderabad & surroundings',
                img: 'https://images.pexels.com/photos/8333069/pexels-photo-8333069.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-steel-800/60 backdrop-blur border border-steel-600 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 group"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <c.icon size={14} className="text-amber-400" />
                    <span className="text-white text-sm font-semibold">{c.title}</span>
                  </div>
                  <p className="text-steel-400 text-xs leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick info band */}
      <div className="bg-amber-500 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-steel-900 text-sm font-semibold">
          <span className="flex items-center gap-1.5">
            <Phone size={15} /> Call for quotes: +91 73863 81729
          </span>
          <span className="text-steel-700">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} /> IDA Nacharam, Hyderabad - 500076
          </span>
          <span className="text-steel-700">|</span>
          <span>Custom measurements available on all products</span>
        </div>
      </div>
    </section>
  );
}
