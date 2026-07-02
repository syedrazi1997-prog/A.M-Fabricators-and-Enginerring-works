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

  // Dynamic state hooks for saving finalized user details
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [txnId, setTxnId] = useState('');

  useEffect(() => {
    const sections = ['home', 'products', 'about', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return { el, obs };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.obs.unobserve(item.el);
      });
    };
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor &&
          i.selectedStyle === item.selectedStyle
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(index);
      return;
    }
    setCartItems((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: qty } : item)));
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
          onOrderSuccess={(email: string, name: string, phone: string, amount: number) => {
            setCartItems([]);
            setCartOpen(false);
            setBuyerEmail(email);
            setBuyerName(name);
            setBuyerPhone(phone);
            setPaidAmount(amount);
            setTxnId("TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase());
            setActiveSection('payment-success');
          }}
        />
      )}
      
      <Chat />

      {activeSection === 'payment-success' && (
        <PaymentSuccess 
          confirmationId={txnId} 
          customerEmail={buyerEmail} 
          customerName={buyerName}
          customerPhone={buyerPhone}
          amountPaid={paidAmount} 
          orderId="AM-ORD-9921"
        />
      )}
    </div>
  );
}
