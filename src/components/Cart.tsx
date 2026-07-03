import { useState } from 'react';
import { X, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
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
  customerInfo: { name: string; email: string; phone: string }
) {
  // INSERT as 'pending' — satisfies RLS INSERT policy (status must be 'pending')
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: customerInfo.name || null,
      customer_email: customerInfo.email || null,
      customer_phone: customerInfo.phone || null,
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
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(lineItems);
  if (itemsError) console.error('Failed to save order items:', itemsError);

  // UPDATE to 'paid' with Razorpay payment ID — UPDATE policy allows pending → paid only
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'paid', razorpay_payment_id: paymentId })
    .eq('id', order.id);
  if (updateError) console.error('Failed to mark order as paid:', updateError);
}

export default function Cart({ items, onClose, onRemove, onUpdateQty, onOrderSuccess }: CartProps) {
  const [saving, setSaving] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleCheckout = () => {
    if (items.length === 0) return;

    const options: RazorpayOptions = {
      key: 'rzp_live_T8gb3CmRe1eNyx',
      amount: total * 100,
      currency: 'INR',
      name: 'A.M Fabricators Engineering Works',
      description: `Order for ${items.length} fabrication item(s)`,
      handler: async (response) => {
        setSaving(true);
        await saveOrderToDb(items, subtotal, gst, total, response.razorpay_payment_id, {
          name: '',
          email: '',
          phone: '',
        });
        setSaving(false);
        onOrderSuccess();
        alert(
          `Payment successful!\nPayment ID: ${response.razorpay_payment_id}\n\nThank you for your order. Our team will contact you at +91 73863 81729 to confirm measurements and delivery.`
        );
        onClose();
      },
      prefill: { name: '', email: '', contact: '' },
      notes: {
        order_items: items.map((i) => `${i.productName} (${i.measurementLabel}) x${i.quantity}`).join(', '),
        contact: '+91 73863 81729',
        address: 'IDA Nacharam, Hyderabad',
      },
      theme: { color: '#f59e0b' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />

      <div className="w-full max-w-md bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-steel-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" />
            <span className="font-display font-bold text-lg">Your Cart</span>
            <span className="bg-amber-500 text-steel-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button onClick={onClose} className="hover:text-amber-400 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
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
              onClick={handleCheckout}
              disabled={saving}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-steel-900 font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving order...
                </>
              ) : (
                <>Pay with Razorpay — ₹{total.toLocaleString('en-IN')}</>
              )}
            </button>

            <p className="text-xs text-center text-steel-400 mt-2.5 leading-snug">
              After payment, our team will contact you at{' '}
              <span className="font-semibold">+91 73863 81729</span> to finalize measurements &amp; schedule delivery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
