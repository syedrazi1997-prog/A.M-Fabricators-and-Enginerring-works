import { useState } from 'react';
import { COLOR_OPTIONS, DESIGN_PATTERNS } from '../data/designBook';
import { ShoppingCart, Ruler, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import type { CartItem } from '../types/cart';

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  // Safe state mapping at the parent component layer
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedDesigns, setSelectedDesigns] = useState<Record<string, string>>({});

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMeasurements, setSelectedMeasurements] = useState<Record<string, number>>({});
  const [customDims, setCustomDims] = useState<Record<string, { w: string; h: string }>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const getMeasurementIndex = (pid: string) => selectedMeasurements[pid] ?? 0;
  const getQuantity = (pid: string) => quantities[pid] ?? 1;

  const getPrice = (pid: string) => {
    const product = products.find((p) => p.id === pid)!;
    const mIdx = getMeasurementIndex(pid);
    const qty = getQuantity(pid);
    
    let base = product.basePrice;
    
    // Custom dimensions handling
    if (product.customMeasurement && customDims[pid]) {
      const w = parseFloat(customDims[pid].w) || 0;
      const h = parseFloat(customDims[pid].h) || 0;
      if (w > 0 && h > 0) {
        // Simple multiplier fallback rule if no matching standard label fits
        base = product.basePrice * (w * h / 10); 
      } else if (product.measurements[mIdx]) {
        base = product.basePrice * product.measurements[mIdx].priceMultiplier;
      }
    } else if (product.measurements[mIdx]) {
      base = product.basePrice * product.measurements[mIdx].priceMultiplier;
    }

    return Math.round(base * qty);
  };

  const handleAddToCart = (pid: string) => {
    const product = products.find((p) => p.id === pid)!;
    const mIdx = getMeasurementIndex(pid);
    const qty = getQuantity(pid);
    const price = getPrice(pid);

    const dims = product.customMeasurement && customDims[pid]
      ? `${customDims[pid].w || '0'}ft × ${customDims[pid].h || '0'}ft (Custom)`
      : product.measurements[mIdx]?.label || 'Standard';

    onAddToCart({
      id: `${pid}-${Date.now()}`,
      productId: pid,
      name: product.name,
      price: price / qty,
      quantity: qty,
      category: product.category,
      unit: product.unit,
      dimensions: dims,
      color: selectedColors[pid] || (product.colorOptions?.[0]?.name) || 'Standard Black',
      design: selectedDesigns[pid] || 'Classic Grid Pattern'
    });

    setAdded(prev => ({ ...prev, [pid]: true }));
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [pid]: false }));
    }, 2000);
  };

  // Safe global fallback image anchor
  const fallbackImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Fabrication Catalog
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Premium metal structures custom built according to your precise structural dimensions. Select a template below to view dynamic pricing estimates.
          </p>
        </div>

        {/* Category Filters Menu Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-amber-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Layout Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const isExpanded = expandedProduct === product.id;
            const currentQty = getQuantity(product.id);
            const activeColorName = selectedColors[product.id] || product.colorOptions?.[0]?.name || 'Default';

            // Extract the first secure string URL cleanly from the images array payload
            const primaryImageUrl = product.images && product.images.length > 0 
              ? product.images[0] 
              : fallbackImage;

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Hero Asset Media Thumbnail Frame */}
                <div className="relative h-56 bg-slate-200 overflow-hidden">
                  <img
                    src={primaryImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>

                {/* Card Body Details Panel Layout */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{product.name}</h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Estimated Price</span>
                        <span className="text-2xl font-black text-slate-900">
                          ₹{getPrice(product.id).toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-500 text-xs ml-1 font-semibold">
                          ({currentQty} {product.unit}{currentQty > 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Base Rate</span>
                        <span className="text-sm font-bold text-slate-700">₹{product.basePrice.toLocaleString('en-IN')}/{product.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Action Trigger Dropdowns Toggle Control Panel */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
                    >
                      <Ruler className="w-4 h-4 text-amber-500" />
                      {isExpanded ? 'Hide Specifications' : 'Configure Sizes & Options'}
                      {isExpanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>

                    {/* Collapsible Measurement / Options Panel */}
                    {isExpanded && (
                      <div className="pt-2 space-y-4 border-t border-dashed border-slate-200 animate-fadeIn">
                        
                        {/* Size Selection */}
                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Select Dimensions:</label>
                          <div className="grid grid-cols-1 gap-1.5">
                            {product.measurements.map((m, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedMeasurements(prev => ({ ...prev, [product.id]: idx }))}
                                className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium border transition-all flex justify-between items-center ${
                                  getMeasurementIndex(product.id) === idx
                                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs font-bold'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{m.label}</span>
                                <span className={getMeasurementIndex(product.id) === idx ? 'text-amber-600 font-bold' : 'text-slate-400'}>
                                  (x{m.priceMultiplier})
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Input Multipliers */}
                        {product.customMeasurement && (
                          <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100/60">
                            <span className="block text-xs font-bold text-amber-800 mb-2">Need a custom sizing layout?</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Width (ft)</span>
                                <input
                                  type="number"
                                  placeholder="e.g. 5"
                                  value={customDims[product.id]?.w || ''}
                                  onChange={(e) => setCustomDims(prev => ({
                                    ...prev,
                                    [product.id]: { ...prev[product.id], w: e.target.value }
                                  }))}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Height (ft)</span>
                                <input
                                  type="number"
                                  placeholder="e.g. 7"
                                  value={customDims[product.id]?.h || ''}
                                  onChange={(e) => setCustomDims(prev => ({
                                    ...prev,
                                    [product.id]: { ...prev[product.id], h: e.target.value }
                                  }))}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Color Options Display Row inside Collapsible Box */}
                        {product.colorOptions && product.colorOptions.length > 0 && (
                          <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">
                              Finish Coating: <span className="text-slate-700 font-bold normal-case">{activeColorName}</span>
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {product.colorOptions.map((c, idx) => (
                                <button
                                  key={idx}
                                  title={c.name}
                                  onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: c.name }))}
                                  className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                                    activeColorName === c.name ? 'border-amber-500 scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: c.hex }}
                                >
                                  {activeColorName === c.name && (
                                    <span className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full mix-blend-difference" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Product Structural Core Features Bullet Highlights */}
                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Key Build Specs:</label>
                          <ul className="space-y-1">
                            {product.features.map((feat, idx) => (
                              <li key={idx} className="text-xs text-slate-600 flex items-start gap-1">
                                <span className="text-amber-500 mt-0.5">•</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    )}

                    {/* Quantity Controls and Add to Cart Button Block */}
                    <div className="flex gap-2 pt-2">
                      <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200">
                        <button
                          onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] ?? 1) - 1) }))}
                          className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-800">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] ?? 1) + 1 }))}
                          className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={`flex-grow flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-md ${
                          added[product.id]
                            ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                            : 'bg-slate-900 hover:bg-amber-600 text-white shadow-slate-900/10 hover:shadow-amber-600/20'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {added[product.id] ? 'Added to Estimate!' : 'Add to Estimate'}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
