import { Phone, MapPin, Wrench, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-steel-900 border-t border-steel-700">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center">
                <Wrench size={20} className="text-steel-900" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base leading-tight">A.M FABRICATORS</div>
                <div className="text-amber-400 text-xs font-medium tracking-wider">ENGINEERING WORKS</div>
              </div>
            </div>
            <p className="text-steel-400 text-sm leading-relaxed mb-4 max-w-xs">
              Premium iron fabrication — gates, grills, railings, staircases, and industrial structures. Custom measurements, professional finish, Hyderabad's most trusted fabricators.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/p/AM-Fabricators-100069324396603/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-steel-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-steel-400 group-hover:text-steel-900" />
              </a>
              <div className="w-9 h-9 bg-steel-800 hover:bg-amber-500 rounded-lg flex items-center justify-center cursor-pointer transition-colors group">
                <Instagram size={16} className="text-steel-400 group-hover:text-steel-900" />
              </div>
              <div className="w-9 h-9 bg-steel-800 hover:bg-amber-500 rounded-lg flex items-center justify-center cursor-pointer transition-colors group">
                <Twitter size={16} className="text-steel-400 group-hover:text-steel-900" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['home', 'products', 'about', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-steel-400 hover:text-amber-400 text-sm capitalize transition-colors"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold text-base mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-steel-400 text-sm">
                  IDA Nacharam,<br />Hyderabad – 500076,<br />Telangana
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 flex-shrink-0" />
                <a href="tel:+917386381729" className="text-steel-400 hover:text-amber-400 text-sm transition-colors">
                  +91 73863 81729
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-steel-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-steel-500 text-xs">
            © 2024 A.M Fabricators Engineering Works. All rights reserved.
          </p>
          <p className="text-steel-600 text-xs">
            IDA Nacharam, Hyderabad | GST Registered
          </p>
        </div>
      </div>
    </footer>
  );
}
