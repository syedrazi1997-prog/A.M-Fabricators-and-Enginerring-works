import { CheckCircle, Users, Award, Hammer, Clock, Truck } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
              About Us
            </div>
            <h2 className="font-display text-4xl font-bold text-steel-900 mb-4 leading-tight">
              Crafting Strength &amp; Style in Iron Since 2008
            </h2>
            <p className="text-steel-600 leading-relaxed mb-4">
              A.M Fabricators Engineering Works is a trusted name in iron fabrication based in IDA Nacharam, Hyderabad.
              For over 15 years, we have been delivering high-quality MS iron products — from ornamental gates to heavy industrial structures.
            </p>
            <p className="text-steel-600 leading-relaxed mb-6">
              Every product is custom-fabricated to your exact measurements using ISI-grade mild steel, with professional TIG/MIG welding, anti-rust treatment, and durable powder-coat or enamel finish. We serve residential, commercial, and industrial clients across Hyderabad.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Custom measurements on all products',
                'Free site visit within Hyderabad',
                'ISI certified MS iron material',
                'Professional installation support',
                'Anti-rust primer + quality finish',
                'Timely project delivery',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-steel-700">{f}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, val: '1000+', label: 'Happy Clients' },
                { icon: Award, val: '15+', label: 'Years Experience' },
                { icon: Hammer, val: '500+', label: 'Projects' },
              ].map((s) => (
                <div key={s.label} className="text-center bg-steel-50 rounded-xl p-4">
                  <s.icon size={22} className="text-amber-500 mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-steel-900">{s.val}</div>
                  <div className="text-steel-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/10533362/pexels-photo-10533362.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fabrication workshop"
                className="rounded-2xl object-cover h-52 w-full"
              />
              <img
                src="https://images.pexels.com/photos/18143352/pexels-photo-18143352.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Iron gate"
                className="rounded-2xl object-cover h-52 w-full"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/4671451/pexels-photo-4671451.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Finished fabrication"
              className="rounded-2xl object-cover h-48 w-full"
            />

            {/* Service cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, title: '7–14 Days', subtitle: 'Average delivery time' },
                { icon: Truck, title: 'Free Delivery', subtitle: 'Within Hyderabad city' },
              ].map((c) => (
                <div key={c.title} className="bg-steel-900 text-white rounded-xl p-4 flex items-center gap-3">
                  <c.icon size={22} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm">{c.title}</div>
                    <div className="text-steel-400 text-xs">{c.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
