import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Chat from './components/Chat';
import Footer from './components/Footer';
import type { CartItem } from './types/cart';
import { PaymentSuccess } from './components/PaymentSuccess';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'products', 'about', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.measurementLabel === item.measurementLabel
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + item.quantity,
          totalPrice: (updated[idx].quantity + item.quantity) * updated[idx].unitPrice,
        };
        return updated;
      }
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: qty, totalPrice: qty * item.unitPrice } : item
      )
    );
  };

 return (
    <div className="min-h-screen font-sans">
      <Header cartItems={cartItems} onCartOpen={() => setCartOpen(true)} activeSection={activeSection} />
      
      <main>
        <Hero />
        <Products onAddToCart={addToCart} />
        <About />
        <Contact />
      </main>
      
      <Footer />
      
      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onOrderSuccess={() => setCartItems([])}
        />
      )}
      
      <Chat />

      {/* Place the HTML block for PaymentSuccess right here */}
      {activeSection === 'payment-success' && (
        <PaymentSuccess 
          confirmationId="TXN-A1B2C3D4" 
          customerEmail="user@example.com" 
          amountPaid={1200} 
        />
      )}
    </div>
  );
