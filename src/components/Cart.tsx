import { useState } from 'react';
import { X, Trash2, ShoppingBag, Loader2, User, Phone, Mail, MapPin, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import type { CartItem } from '../types/cart';
import { supabase } from '../lib/supabase';

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
  handler: (response: { razorpay_payment_id: string; razorpay_order_id?: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onUpdateQty: (index: number, qty: number) => void;
  onOrderSuccess: () => void;
}

async function saveOrderToDb(
  items: CartItem[],
  subtotal: number,
  gst: number,
  total: number,
  paymentId: string,
  customer: CustomerInfo
) {
  const fullAddress = `${customer.address}, ${customer.city} - ${customer.pincode}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: customer.name || null,
      customer_email: customer.email || null,
      customer_phone: customer.phone || null,
      customer_address: fullAddress || null,
      subtotal,
      gst_amount: gst,
      total_amount: total,
      status: 'pending',
    })
    .select('id')
    .maybeSingle();

  if (orderError || !order) {
    console.error('Failed to save order:', orderError);
    return;
  }

  const lineItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    measurement_label: item.measurementLabel,
    width_ft: item.width,
    height_ft: item.height,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total_price: item.unitPrice * item.quantity,
    is_custom: item.isCustom,
    selected_color: item.selectedColor || null,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(lineItems);
  if (itemsError) console.error('Failed to save order items:', itemsError);

  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'paid', razorpay_payment_id: paymentId })
    .eq('id', order.id);
  if (updateError) console.error('Failed to mark order as paid:', updateError);
}

export default function Cart({ items, onClose, onRemove, onUpdateQty, onOrderSuccess }: CartProps) {
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const validateDetails = (): boolean => {
    const e: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!customer.name.trim()) e.name = 'Required';
    if (!customer.phone.trim()) e.phone = 'Required';
    else if (!/^[6-9]\d{9}$/.test(customer.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
    if (!customer.address.trim()) e.address = 'Required';
    if (!customer.city.trim()) e.city = 'Required';
    if (!customer.pincode.trim()) e.pincode = 'Required';
    else if (!/^\d{6}$/.test(customer.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode';
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProceedToDetails = () => {
    if (items.length === 0) return;
    setStep('details');
  };

  const handleCheckout = () => {
    if (!validateDetails()) return;
    if (items.length === 0) return;

    const options: RazorpayOptions = {
      key: 'rzp_live_T8gb3CmRe1eNyx',
      amount: total * 100,
      currency: 'INR',
      name: 'A.M Fabricators Engineering Works',
      description: `Order for ${items.length} fabrication item(s)`,
      handler: async (response) => {
        setSaving(true);
        await saveOrderToDb(items, subtotal, gst, total, response.razorpay_payment_id, customer);
        setSaving(false);
        setStep('success');
        setTimeout(() => {
          onOrderSuccess();
          onClose();
          setStep('cart');
        }, 3500);
      },
      prefill: { name: customer.name, email: customer.email, contact: customer.phone },
      notes: {
        order_items: items.map((i) => `${i.productName} (${i.measurementLabel}) x${i.quantity}`).join(', '),
        contact: '+91 73863 81729',
        address: `${customer.address}, ${customer.city} - ${customer.pincode}`,
      },
      theme: { color: '#f59e0b' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const inputClass = (field: keyof CustomerInfo) =>
    `w-full text-sm border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-steel-200 bg-gray-50'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />

      <div className="w-full max-w-md bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-steel-900 text-white">
          <div className="flex items-center gap-2">
            {step === 'details' && (
              <button
                onClick={() => setStep('cart')}
                className="hover:text-amber-400 transition-colors mr-1"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <ShoppingBag size={20} className="text-amber-400" />
            <span className="font-display font-bold text-lg">
              {step === 'cart' ? 'Your Cart' : step === 'details' ? 'Customer Details' : 'Order Placed'}
            </span>
            {step === 'cart' && (
              <span className="bg-amber-500 text-steel-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button onClick={onClose} className="hover:text-amber-400 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Success Step */}
        {step === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <CheckCircle2 size={64} className="text-green-500 mb-4" />
            <h3 className="font-display text-xl font-bold text-steel-900 mb-2">Order Placed Successfully!</h3>
            <p className="text-sm text-steel-600 mb-1">Thank you, {customer.name.split(' ')[0]}!</p>
            <p className="text-xs text-steel-400 max-w-xs leading-relaxed">
              Our team will contact you at <span className="font-semibold text-steel-600">{customer.phone}</span> within
              24 hours to confirm measurements and schedule delivery.
            </p>
          </div>
        ) : step === 'details' ? (
          /* Customer Details Form */
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <p className="text-xs text-steel-500 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Please provide your details so our team can contact you to confirm measurements and schedule delivery.
              </p>

              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-steel-700 mb-1.5">
                  <User size={13} className="text-amber-500" /> Full Name *
                </label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-steel-700 mb-1.5">
                  <Phone size={13} className="text-amber-500" /> Mobile Number *
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-steel-700 mb-1.5">
                  <Mail size={13} className="text-amber-500" /> Email (optional)
                </label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-steel-700 mb-1.5">
                  <MapPin size={13} className="text-amber-500" /> Delivery Address *
                </label>
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House no, street, area, landmark"
                  rows={2}
                  className={inputClass('address') + ' resize-none'}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* City + Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-steel-700 mb-1.5 block">City *</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="City"
                    className={inputClass('city')}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-steel-700 mb-1.5 block">Pincode *</label>
                  <input
                    type="text"
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={inputClass('pincode')}
                  />
                  {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Order summary mini */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5">
                <div className="flex justify-between text-xs text-steel-600">
                  <span>Items ({items.length})</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-steel-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-steel-900 border-t border-gray-200 pt-1.5">
                  <span>Total</span>
                  <span className="text-amber-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-4 bg-gray-50">
              <button
                onClick={handleCheckout}
                disabled={saving}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-steel-900 font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing payment...
                  </>
                ) : (
                  <>
                    Pay ₹{total.toLocaleString('en-IN')} <ChevronRight size={16} />
                  </>
                )}
              </button>
              <p className="text-xs text-center text-steel-400 mt-2.5 leading-snug">
                After payment, our team will contact you at{' '}
                <span className="font-semibold">+91 73863 81729</span> to finalize measurements &amp; schedule delivery.
              </p>
            </div>
          </>
        ) : (
          /* Cart Items Step */
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-steel-400">
                  <ShoppingBag size={48} className="mb-3 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                  <p className="text-xs mt-1">Add products to get a quote</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-steel-900 truncate">{item.productName}</h4>
                      <p className="text-xs text-steel-500 mb-1">{item.measurementLabel}</p>
                      {item.selectedColor && (
                        <p className="text-xs text-steel-400 mb-0.5">Color: {item.selectedColor}</p>
                      )}
                      <p className="text-sm font-bold text-amber-600">₹{item.unitPrice.toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <button
                          onClick={() => onUpdateQty(idx, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 border border-steel-300 rounded text-steel-700 font-bold text-xs hover:bg-gray-100 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(idx, item.quantity + 1)}
                          className="w-6 h-6 border border-steel-300 rounded text-steel-700 font-bold text-xs hover:bg-gray-100 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                      <span className="text-sm font-bold text-steel-900">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 px-5 py-4 bg-gray-50">
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-sm text-steel-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-steel-600">
                    <span>GST (18%)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-steel-900 border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-amber-600">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToDetails}
                  className="w-full bg-steel-800 hover:bg-steel-700 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ChevronRight size={16} />
                </button>

                <p className="text-xs text-center text-steel-400 mt-2.5 leading-snug">
                  Estimated pricing — final quote confirmed after measurement visit.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
