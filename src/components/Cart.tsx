import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Loader2, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Self-contained type declaration to eliminate global import errors
interface LocalCartItem {
  productId: string;
  productName: string;
  measurementLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string }) => void;
  prefill?: { name?: string; contact?: string };
  theme?: { color?: string };
}

interface CartProps {
  cartItems: LocalCartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveFromCart: (index: number) => void;
  onNavigate?: (page: string) => void;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveFromCart, onNavigate }: CartProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Local Form UI state overrides
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<CustomerDetails>>({});

  const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

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
    if (!customerInfo.address.trim()) errors.address = 'Site installation address is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setShowCustomerForm(false); 

    try {
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('rzp_test_p0X8gXpYwZk8pM:YOUR_SECRET_HERE')}`, 
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!response.ok) throw new Error('Could not establish secure payment handshake.');
      const order = await response.json();

      const options: RazorpayOptions = {
        key: 'rzp_live_T8gb3CmRe1eNyx', 
        amount: order.amount,
        currency: 'INR',
        name: 'A.M Fabricators',
        description: 'Structural Design Estimation Checkout',
        handler: async function (response) {
          try {
            const { error: dbError } = await supabase
              .from('orders')
              .insert([{
                items: JSON.stringify(cartItems),
                total_amount: total,
                payment_id: response.razorpay_payment_id,
                status: 'paid',
                notes: `Name: ${customerInfo.name} | Phone: ${customerInfo.phone} | Addr: ${customerInfo.address} | Custom Notes: ${customerInfo.notes}`
              }]);

            if (dbError) throw dbError;
            if (onNavigate) onNavigate('home');
          } catch (err: any) {
            setError(err.message || 'Payment updated but database save context failed.');
          }
        },
        prefill: {
          name: customerInfo.name,
          contact: customerInfo.phone,
        },
        theme: { color: '#f59e0b' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'An unexpected runtime compilation error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-900">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">Your Estimation Cart</h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-medium">Your specification compilation is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.productName}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sizing Layout: {item.measurementLabel}</p>
                  <span className="text-sm font-black text-slate-800 block mt-1">₹{item.totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} className="px-2 py-1 text-slate-600 font-bold">-</button>
                    <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 text-slate-600 font-bold">+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(index)} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-semibold text-slate-500">Subtotal Value:</span>
              <span className="text-2xl font-black text-slate-900">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => setShowCustomerForm(true)}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-amber-500 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Checkout Terminal...
                </>
              ) : (
                'Provide Details & Pay'
              )}
            </button>
          </div>
        )}
      </div>

      {/* OVERLAY CUSTOMER INPUT MODAL DIALOG */}
      {showCustomerForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 text-slate-900">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold">Contact & Site Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">Please fill out details before secure routing</p>
              </div>
              <button onClick={() => setShowCustomerForm(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleProcessPayment} className="p-5 space-y-4">
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
                  className={`w-full rounded-xl border p-2.5 text-sm focus:outline-hidden ${formErrors.name ? 'border-rose-400' : 'border-slate-200'}`}
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
                  className={`w-full rounded-xl border p-2.5 text-sm focus:outline-hidden ${formErrors.phone ? 'border-rose-400' : 'border-slate-200'}`}
                />
                {formErrors.phone && <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Delivery/Site Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Plot no, Street name, City area, Hyderabad..."
                  className={`w-full rounded-xl border p-2.5 text-sm focus:outline-hidden ${formErrors.address ? 'border-rose-400' : 'border-slate-200'}`}
                />
                {formErrors.address && <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Special Structural Specifications / Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any particular iron gauge preferences..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                >
                  Proceed to Razorpay Window
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
