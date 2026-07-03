import React, { useState } from 'react';
import { useCart } from '../hooks/useCart'; // ◄--- FIXED IMPORT PATH
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, User, Phone, MapPin } from 'lucide-react';

interface CartProps {
  onNavigate?: (page: string) => void;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function Cart({ onNavigate }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  
  // State to manage Customer Information Modal
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<CustomerDetails>>({});

  const fallbackImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof CustomerDetails]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Partial<CustomerDetails> = {};
    if (!customerInfo.name.trim()) errors.name = 'Full name is required';
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerInfo.phone.trim().replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!customerInfo.address.trim()) errors.address = 'Site address is required for fabrication evaluation';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build structured WhatsApp breakdown with complete customer information
    let message = `*A.M FABRICATORS - NEW COMMERCIAL ESTIMATE ORDER*\n`;
    message += `=============================\n\n`;
    message += `*CUSTOMER DETAILS:*\n`;
    message += `👤 Name: ${customerInfo.name}\n`;
    message += `📞 Phone: ${customerInfo.phone}\n`;
    message += `📍 Site Address: ${customerInfo.address}\n`;
    if (customerInfo.notes.trim()) {
      message += `📝 Special Instructions: ${customerInfo.notes}\n`;
    }
    message += `\n=============================\n\n`;
    message += `*ESTIMATED FABRICATION ITEMS:*\n`;

    cartItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.productName}*\n`;
      message += `   • Size/Dimensions: ${item.measurementLabel}\n`;
      message += `   • Qty: ${item.quantity}\n`;
      message += `   • Estimated Price: ₹${item.totalPrice.toLocaleString('en-IN')}\n\n`;
    });

    message += `=============================\n`;
    message += `*Grand Total Estimated Value:* ₹${getCartTotal().toLocaleString('en-IN')}\n\n`;
    message += `Please verify this quote outline and initiate architectural layout planning verification.`;

    const encodedText = encodeURIComponent(message);
    
    setShowCheckoutModal(false);
    window.open(`https://wa.me/919989939705?text=${encodedText}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Estimate Cart is Empty</h2>
        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
          Explore our fabrication catalog to add custom gates, grills, railings, or structures to your pricing layout.
        </p>
        <button
          onClick={() => onNavigate?.('products')}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-500/20"
        >
          Browse Our Products
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
        Your Estimate Review (<span className="text-amber-500">{cartItems.length}</span>)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
            >
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || fallbackImage}
                    alt={item.productName}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{item.productName}</h3>
                  
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">Sizing: <strong className="text-slate-800">{item.measurementLabel}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:border-l sm:border-slate-100 sm:pl-6 self-stretch sm:self-center">
                <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="text-xs text-slate-400 block font-semibold">Estimated Total</span>
                  <span className="text-lg font-black text-slate-900">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => onNavigate?.('products')}
              className="text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              ← Add more structures
            </button>
          </div>
        </div>

        {/* Pricing Summary Sidebar Breakdown Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl h-fit border border-slate-800">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Estimate Summary</h3>
          
          <div className="space-y-3 pb-4 border-b border-slate-800 text-sm text-slate-400">
            <div className="flex justify-between">
              <span>Total Items Selected</span>
              <span className="text-white font-semibold">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
            </div>
            <div className="flex justify-between">
              <span>Site Consultation</span>
              <span className="text-emerald-400 font-medium uppercase text-xs tracking-wider">Free</span>
            </div>
          </div>

          <div className="pt-4 mb-6">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-400">Grand Total Estimate</span>
              <span className="text-3xl font-black text-amber-400">
                ₹{getCartTotal().toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowCheckoutModal(true)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white text-center font-extrabold py-4 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 uppercase tracking-wider text-xs flex items-center justify-center gap-2"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CUSTOMER INFORMATION MODAL DIALOG */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Contact & Site Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">Please fill out your details before final layout evaluation</p>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFinalCheckoutSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border p-3 text-sm focus:outline-hidden focus:ring-2 ${formErrors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'}`}
                />
                {formErrors.name && <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full rounded-xl border p-3 text-sm focus:outline-hidden focus:ring-2 ${formErrors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'}`}
                />
                {formErrors.phone && <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Complete Delivery/Installation Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Plot no, Street name, City area, Hyderabad..."
                  className={`w-full rounded-xl border p-3 text-sm focus:outline-hidden focus:ring-2 ${formErrors.address ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-500'}`}
                />
                {formErrors.address && <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Special Work Specifications / Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any particular iron gauge spacing or design layout preference..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-sm font-bold text-slate-700">Amount Due:</span>
                  <span className="text-xl font-black text-slate-900">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-amber-500 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Confirm & Route to Checkout Gateway
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
