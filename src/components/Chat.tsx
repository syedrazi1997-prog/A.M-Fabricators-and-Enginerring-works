import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Bot } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  from: 'user' | 'bot';
  text: string;
  time: string;
}

const now = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

const SESSION_KEY = 'amfab_chat_session';

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const botResponses: Record<string, string> = {
  gate: 'We fabricate main gates, sliding gates, compound gates, and collapsible gates in MS iron. All sizes available — standard or custom. Prices start from ₹9,500. Call +91 73863 81729 for a detailed quote!',
  grill: 'Our window grills are made from 16mm MS square bars in decorative patterns (square, flower, diamond). Prices start at ₹2,800 for 3×3 ft. Custom sizes available!',
  railing: 'We make MS balcony railings, staircase railings, and terrace railings. Prices start at ₹950 per running foot. Contact us for a free site visit!',
  staircase: 'Our MS staircases come with matching railings and anti-slip chequered plate steps. Prices from ₹45,000 per flight. Custom step count and width available.',
  door: 'Heavy-duty MS security doors starting at ₹12,500. Triple-point locking, anti-drill hinges, and 2-coat paint finish. Standard & custom sizes.',
  shed: 'Industrial shed structures for factories, warehouses, and parking areas. Prices from ₹85,000. Custom span and height. Free site survey for orders in Hyderabad.',
  price: 'Prices vary by product type and size. Gates start from ₹9,500, grills from ₹2,800, railings from ₹950/ft. Call +91 73863 81729 for a free quote!',
  delivery: 'Delivery within 7–14 days for standard products. Custom orders may take up to 21 days. Free delivery within Hyderabad city.',
  payment: 'We accept online payments via Razorpay (UPI, cards, net banking). You can also pay by cash or bank transfer. 50% advance required for orders above ₹10,000.',
  contact: 'You can reach us at +91 73863 81729 (Mon–Sat, 9 AM–7 PM) or visit our workshop at IDA Nacharam, Hyderabad.',
  location: 'Our workshop is at IDA Nacharam, Hyderabad – 500076, Telangana. Call us at +91 73863 81729 to schedule a visit!',
  warranty: 'All our products come with a 1-year workmanship warranty. Anti-rust coating extends the life significantly. Contact us for details.',
  install: 'We offer professional installation support. Free installation within Hyderabad for orders above ₹25,000.',
  custom: 'Yes! All our products are made to your exact measurements. Enter your dimensions on the product page or call +91 73863 81729 to discuss.',
};

const quickReplies = ['Gate prices?', 'Custom sizes?', 'Delivery time?', 'Location?', 'Payment options?'];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, reply] of Object.entries(botResponses)) {
    if (lower.includes(key)) return reply;
  }
  return "Thanks for your message! For specific product queries and quotes, please call us at +91 73863 81729 (Mon–Sat, 9 AM–7 PM). We'll be happy to help with any fabrication requirement!";
}

async function persistMessage(sessionId: string, fromUser: boolean, message: string) {
  await supabase.from('chat_messages').insert({ session_id: sessionId, from_user: fromUser, message });
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: 'Hello! Welcome to A.M Fabricators Engineering Works. How can I help you today? Ask me about our gates, grills, railings, pricing, or call us at +91 73863 81729.',
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    const msg = text.trim();
    if (!msg) return;

    setMessages((m) => [...m, { from: 'user', text: msg, time: now() }]);
    setInput('');
    setTyping(true);

    persistMessage(sessionId.current, true, msg);

    setTimeout(() => {
      const reply = getBotReply(msg);
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: reply, time: now() }]);
      persistMessage(sessionId.current, false, reply);
    }, 900);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-amber-500 hover:bg-amber-400 text-steel-900 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-amber-500/40 hover:shadow-2xl ${open ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle size={26} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 max-h-[600px]">
          {/* Header */}
          <div className="bg-steel-900 px-4 py-3 flex items-center gap-3">
            <div className="relative w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="text-steel-900" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-steel-900" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-bold">A.M Fabricators Support</div>
              <div className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online now
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="tel:+917386381729"
                className="w-8 h-8 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-steel-900 rounded-lg flex items-center justify-center transition-colors"
                title="Call us"
              >
                <Phone size={15} />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 bg-steel-800 hover:bg-steel-700 text-steel-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-64 max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-steel-800 text-white rounded-br-sm'
                      : 'bg-white text-steel-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`text-xs mt-1 ${m.from === 'user' ? 'text-steel-400' : 'text-steel-300'}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs bg-steel-50 hover:bg-amber-100 text-steel-600 hover:text-steel-900 border border-steel-200 px-2.5 py-1 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask about products, prices..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 bg-amber-500 hover:bg-amber-400 disabled:bg-gray-200 text-steel-900 disabled:text-gray-400 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
