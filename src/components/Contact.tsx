import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, ExternalLink, Send, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError('Name and message are required.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "17377fb6-0966-46f2-bbb1-cb94ff71c1a4",
          name: form.name.trim(),
          email: form.email.trim() || "Not Provided",
          phone: form.phone.trim() || "Not Provided",
          subject: form.subject.trim() || "New Contact Form Submission",
          message: form.message.trim(),
        })
      });

      const data = await response.json();

      setSubmitting(false);

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Failed to send message. Please call us directly at +91 73863 81729.');
      }
    } catch (err) {
      setSubmitting(false);
      setError('Something went wrong. Please call us directly at +91 73863 81729.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-steel-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Get In Touch
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">
            Contact &amp; Location
          </h2>
          <p className="text-steel-400 max-w-xl mx-auto">
            Visit our workshop, call us for a quote, or send a message. We respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — info cards */}
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: 'Call for Quotes',
                lines: ['+91 73863 81729'],
                sub: 'Mon–Sat, 9 AM – 7 PM',
                action: { label: 'Call Now', href: 'tel:+917386381729' },
              },
              {
                icon: MapPin,
                title: 'Workshop Address',
                lines: ['IDA Nacharam,', 'Hyderabad – 500076,', 'Telangana'],
                sub: 'Free site visit for orders in Hyderabad',
                action: {
                  label: 'Get Directions',
                  href: 'https://maps.google.com/?q=IDA+Nacharam+Hyderabad',
                },
              },
              {
                icon: Mail,
                title: 'Email Us',
                lines: ['amfabricators3@gmail.com'],
                sub: 'We reply within 24 hours',
                action: { label: 'Send Email', href: 'mailto:amfabricators3@gmail.com' },
              },
              {
                icon: Clock,
                title: 'Working Hours',
                lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: 10:00 AM – 2:00 PM'],
                sub: 'Emergency orders: call +91 73863 81729',
              },
            ].map((card) => (
              <div key={card.title} className="bg-steel-800 border border-steel-700 rounded-xl p-5 hover:border-amber-500/40 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <card.icon size={18} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">{card.title}</h4>
                    {card.lines.map((l) => (
                      <p key={l} className="text-steel-200 text-sm leading-snug">{l}</p>
                    ))}
                    <p className="text-steel-500 text-xs mt-1">{card.sub}</p>
                    {card.action && (
                      <a
                        href={card.action.href}
                        target={card.action.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-semibold mt-2 transition-colors"
                      >
                        {card.action.label}
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — map + contact form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-steel-800 border border-steel-700 rounded-2xl overflow-hidden">
              <div className="bg-steel-700/50 px-4 py-3 flex items-center gap-2 border-b border-steel-700">
                <MapPin size={15} className="text-amber-400" />
                <span className="text-white text-sm font-semibold">
                  A.M Fabricators — IDA Nacharam, Hyderabad
                </span>
              </div>
              <iframe
                title="A.M Fabricators Location"
                src="https://maps.google.com/maps?q=IDA+Nacharam+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-4 py-3 bg-amber-500/10 border-t border-steel-700">
                <p className="text-amber-300 text-xs font-medium">
                  IDA Nacharam Industrial Area, Hyderabad, Telangana 500076
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-steel-800 border border-steel-700 rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-5">Send Us a Message</h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <h4 className="text-white font-bold text-lg mb-1">Message Sent!</h4>
                  <p className="text-steel-400 text-sm">
                    We'll get back to you within 24 hours. For urgent queries call{' '}
                    <a href="tel:+917386381729" className="text-amber-400 font-semibold">+91 73863 81729</a>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs text-steel-400 hover:text-amber-400 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-steel-300 mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full bg-steel-700 border border-steel-600 text-white placeholder-steel-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-steel-300 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-steel-700 border border-steel-600 text-white placeholder-steel-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-steel-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-steel-700 border border-steel-600 text-white placeholder-steel-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-steel-300 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="e.g. Quote for main gate 10ft × 5ft"
                      className="w-full bg-steel-700 border border-steel-600 text-white placeholder-steel-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-steel-300 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Describe your requirement — product type, dimensions, quantity, location..."
                      className="w-full bg-steel-700 border border-steel-600 text-white placeholder-steel-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                    />
                  </div>

                  {error && <p className="text-red-400 text-xs">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-steel-900 font-bold py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
