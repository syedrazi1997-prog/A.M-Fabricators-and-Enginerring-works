import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Phone, MapPin, Wrench } from 'lucide-react';
import type { CartItem } from '../types/cart';

interface HeaderProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
  activeSection: string;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ cartItems, onCartOpen, activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* Top bar */}
      <div className="bg-steel-900 text-steel-200 text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" />
              IDA Nacharam, Hyderabad
            </span>
            <span className="flex items-center gap-1">
              <Phone size={12} className="text-amber-400" />
              +91 73863 81729
            </span>
          </div>
          <span className="text-amber-400 font-medium">Free site visit for bulk orders in Hyderabad</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-steel-900 shadow-xl' : 'bg-steel-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                <Wrench size={20} className="text-steel-900" />
              </div>
              <div className="text-left">
                <div className="font-display font-700 text-white text-base leading-tight tracking-wide">
                  A.M FABRICATORS
                </div>
                <div className="text-amber-400 text-xs font-medium tracking-wider">
                  ENGINEERING WORKS
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    activeSection === l.id
                      ? 'text-amber-400 bg-steel-800'
                      : 'text-steel-200 hover:text-amber-400 hover:bg-steel-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>

            {/* Cart + Mobile menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={onCartOpen}
                className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-steel-900 font-semibold text-sm px-3 py-2 rounded transition-colors"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white p-2 hover:bg-steel-800 rounded"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-steel-800 border-t border-steel-700">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`block w-full text-left px-5 py-3 text-sm font-medium border-b border-steel-700 transition-colors ${
                  activeSection === l.id ? 'text-amber-400' : 'text-steel-200 hover:text-amber-400'
                }`}
              >
                {l.label}
              </button>
            ))}
            <div className="px-5 py-3 text-xs text-steel-400 flex items-center gap-1.5">
              <Phone size={12} className="text-amber-400" />
              +91 73863 81729
            </div>
          </div>
        )}
      </header>
    </>
  );
}
