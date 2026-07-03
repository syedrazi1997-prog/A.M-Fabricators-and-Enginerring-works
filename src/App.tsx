import React, { useState } from 'react';
import { Header } from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Estimator from './components/Estimator';
import Cart from './components/Cart';
import Contact from './components/Contact';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.measurementLabel === item.measurementLabel
      );
      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += item.quantity;
        newItems[existingIndex].totalPrice = newItems[existingIndex].quantity * newItems[existingIndex].unitPrice;
        return newItems;
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Products onAddToCart={addToCart} onNavigate={handleNavigate} />
          </>
        );
      case 'products':
        return <Products onAddToCart={addToCart} onNavigate={handleNavigate} />;
      case 'estimator':
        return <Estimator onAddToCart={addToCart} onNavigate={handleNavigate} />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onNavigate={handleNavigate}
          />
        );
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onNavigate={handleNavigate} cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
