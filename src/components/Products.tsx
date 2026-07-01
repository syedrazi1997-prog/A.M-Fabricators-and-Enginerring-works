import { useState } from 'react';
import { COLOR_OPTIONS, DESIGN_PATTERNS } from '../data/designBook';
import { ShoppingCart, Ruler, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import type { CartItem } from '../types/cart';

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [selectedColor, setSelectedColor] = useState('Matte Black');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMeasurements, setSelectedMeasurements] = useState<Record<string, number>>({});
  const [customDims, setCustomDims] = useState<Record<string, { w: string; h: string }>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  const getMeasurementIndex = (pid: string) => selectedMeasurements[pid] ?? 0;
  const getQuantity = (pid: string) => quantities[pid] ?? 1;

  const getPrice = (pid: string) => {
    const product = products.find((p) => p.id === pid)!;
    const idx = getMeasurementIndex(pid);
    const isCustom = idx === product.measurements.length;
    if (isCustom) {
      const w = parseFloat(customDims[pid]?.w || '0');
      const h = parseFloat(customDims[pid]?.h || '0');
      const area = w * h || 1;
      return Math.round(product.basePrice * area);
    }
    return Math.round(product.basePrice * product.measurements[idx].priceMultiplier);
  };

  const handleAdd = (pid: string) => {
    const product = products.find((p) => p.id === pid)!;
    const idx = getMeasurementIndex(pid);
    const isCustom = idx === product.measurements.length;
    const qty = getQuantity(pid);
    const unitPrice = getPrice(pid);

    let label: string;
    let w: number;
    let h: number;

    if (isCustom) {
      w = parseFloat(customDims[pid]?.w || '0');
      h = parseFloat(customDims[pid]?.h || '0');
      label = `Custom ${w}ft × ${h}ft`;
    } else {
      const m = product.measurements[idx];
      label = m.label;
      w = m.width;
      h = m.height;
    }

    onAddToCart({
      productId: pid,
      productName: product.name,
      measurementLabel: label,
      width: w,
      height: h,
      quantity: qty,
      unitPrice,
      totalPrice: unitPrice * qty,
      image: product.image,
      isCustom,
      customWidth: isCustom ? w : undefined,
      customHeight: isCustom ? h : undefined,
    });

    setAdded((prev) => ({ ...prev, [pid]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [pid]: false })), 2000);
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Our Products
          </div>
          <h2 className="font-display text-4xl font-bold text-steel-900 mb-3">
            Iron Fabrication Products
          </h2>
          <p className="text-steel-600 max-w-xl mx-auto">
            All products are custom-fabricated to your measurements. Select from standard sizes or enter your own dimensions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-steel-800 text-white shadow-md'
                  : 'bg-white text-steel-600 border border-steel-200 hover:border-steel-400 hover:text-steel-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
      

  const categoryKey = product.category.toLowerCase();
  const mappedKey = categoryKey.includes('gate') ? 'gates' : categoryKey.includes('grill') ? 'grills' : '';
  const availableDesigns = DESIGN_PATTERNS[mappedKey] || [];
            const idx = getMeasurementIndex(product.id);
            const isCustom = idx === product.measurements.length;
            const price = getPrice(product.id);
            const qty = getQuantity(product.id);
            const isExpanded = expandedProduct === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-steel-800 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                  </div>
                  <div className="absolute top-2 right-2 flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-bold text-steel-900 mb-1">{product.name}</h3>
                  <p className="text-steel-500 text-xs leading-snug mb-3 line-clamp-2">{product.description}</p>

                  {/* Measurement Select */}
                  <div className="mb-3">
                    <label className="flex items-center gap-1 text-xs font-semibold text-steel-700 mb-1.5">
                      <Ruler size={12} className="text-amber-500" />
                      Select Size
                    </label>
                    <select
                      value={idx}
                      onChange={(e) => {
                        setSelectedMeasurements((prev) => ({
                          ...prev,
                          [product.id]: parseInt(e.target.value),
                        }));
                      }}
                      className="w-full text-xs border border-steel-200 rounded-lg px-2.5 py-2 text-steel-800 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50"
                    >
                      {product.measurements.map((m, i) => (
                        <option key={i} value={i}>
                          {m.label}
                        </option>
                      ))}
                      {product.customMeasurement && (
                        <option value={product.measurements.length}>Custom Measurement</option>
                      )}
                    </select>
                  </div>

                  {/* Custom dims */}
                  {isCustom && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <label className="text-xs text-steel-500 mb-1 block">Width (ft)</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="e.g. 6"
                          value={customDims[product.id]?.w ?? ''}
                          onChange={(e) =>
                            setCustomDims((prev) => ({
                              ...prev,
                              [product.id]: { ...prev[product.id], w: e.target.value },
                            }))
                          }
                          className="w-full text-xs border border-steel-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-steel-500 mb-1 block">Height (ft)</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="e.g. 4"
                          value={customDims[product.id]?.h ?? ''}
                          onChange={(e) =>
                            setCustomDims((prev) => ({
                              ...prev,
                              [product.id]: { ...prev[product.id], h: e.target.value },
                            }))
                          }
                          className="w-full text-xs border border-steel-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Qty + price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-steel-900">
                        ₹{price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-steel-400">per {product.unit}</div>
                    </div>
                    <div className="flex items-center gap-1.5 border border-steel-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantities((q) => ({ ...q, [product.id]: Math.max(1, (q[product.id] ?? 1) - 1) }))}
                        className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-steel-700 font-bold text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-semibold text-steel-800">{qty}</span>
                      <button
                        onClick={() => setQuantities((q) => ({ ...q, [product.id]: (q[product.id] ?? 1) + 1 }))}
                        className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-steel-700 font-bold text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 1. Design Choice Selector */}
        {availableDesigns.length > 0 && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-steel-600 mb-1">Select Design Style</label>
            <select 
              className="w-full text-xs border border-steel-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={selectedDesign}
              onChange={(e) => setSelectedDesign(e.target.value)}
            >
              <option value="">Standard Base Design</option>
              {availableDesigns.map((design) => (
                <option key={design.id} value={design.name}>{design.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* 2. Color Swatch Picker */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-steel-600 mb-1">Finish Color: <span className="text-amber-600">{selectedColor}</span></label>
          <div className="flex gap-2 mt-1.5">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-amber-500 scale-110 ring-2 ring-amber-100' : 'border-gray-200'}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* /* Add to cart */ }
        <button
                  {/* Add to cart */}
                  <button
                    onClick={() => handleAdd(product.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 mt-auto ${
                      added[product.id]
                        ? 'bg-green-500 text-white'
                        : 'bg-steel-800 hover:bg-steel-700 text-white hover:shadow-lg'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {added[product.id] ? 'Added to Cart!' : 'Add to Cart'}
                  </button>

                  {/* Features toggle */}
                  <button
                    onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                    className="mt-2 flex items-center justify-center gap-1 text-xs text-steel-400 hover:text-amber-500 transition-colors"
                  >
                    {isExpanded ? 'Hide' : 'View'} Features
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>

                  {isExpanded && (
                    <ul className="mt-2 space-y-1 border-t border-gray-100 pt-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-steel-600">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
