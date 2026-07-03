import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Footer from './components/Footer';

interface CartItem {
  productId: string;
  productName: string;
  measurementLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
          : item
      )
    );
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNavigate = (page: string) => {
    if (page === 'cart') {
      setCartOpen(true);
      setActiveSection('cart');
    } else {
      setCartOpen(false);
      setActiveSection(page);
      const el = document.getElementById(page);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        activeSection={cartOpen ? 'cart' : activeSection}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
      />

      <main className="flex-grow">
        {cartOpen ? (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            <section id="home">
              <Hero onNavigate={handleNavigate} />
            </section>
            <section id="products">
              <Products onAddToCart={addToCart} />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
