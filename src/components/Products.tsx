import { useState } from 'react';
import { ShoppingCart, Ruler, ChevronDown, ChevronUp } from 'lucide-react';
import { products, categories } from '../data/products';
import type { CartItem } from '../types/cart';

interface ProductsProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMeasurements, setSelectedMeasurements] = useState<Record<string, number>>({});
  const [customDims, setCustomDims] = useState<Record<string, { w: string; h: string }>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});
  
  // Track active slide image index per product card
  const [activeSlideIndex, setActiveSlideIndex] = useState<Record<string, number>>({});

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
    if (product.customMeasurement && customDims[pid]) {
      const w = parseFloat(customDims[pid].w) || 0;
      const h = parseFloat(customDims[pid].h) || 0;
      if (w > 0 && h > 0) {
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
      design: 'Classic Pattern'
    });

    setAdded(prev => ({ ...prev, [pid]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [pid]: false })), 2000);
  };

  const fallbackImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Fabrication Catalog</h2>
          <p className="mt-4 text-lg text-slate-600">Premium custom metal structures. Configure options below to view instant estimates.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat ? 'bg-amber-500 text-white shadow-amber-500/20' : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const isExpanded = expandedProduct === product.id;
            const currentQty = getQuantity(product.id);
            const activeColorName = selectedColors[product.id] || product.colorOptions?.[0]?.name || 'Default';
            
            const currentSlide = activeSlideIndex[product.id] ?? 0;
            const productImages = product.images && product.images.length > 0 ? product.images : [fallbackImage];
            const primaryImageUrl = productImages[currentSlide] || fallbackImage;

            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Image Frame Container with Mini Slider Controls */}
                <div className="relative h-60 bg-white flex items-center justify-center p-2 group/slide">
                  <img
                    src={primaryImageUrl}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {product.category}
                  </div>

                  {/* Dynamic Slide Dots Indicator overlay */}
                  {productImages.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover/slide:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent py-2">
                      {productImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideIndex(prev => ({ ...prev, [product.id]: idx }))}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-500 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">{product.name}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold">Estimated Price</span>
                        <span className="text-2xl font-black text-slate-900">₹{getPrice(product.id).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block uppercase font-bold">Base Rate</span>
                        <span className="text-sm font-bold text-slate-700">₹{product.basePrice.toLocaleString('en-IN')}/{product.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
                    >
                      {isExpanded ? 'Hide Specifications' : 'Configure Options & Gallery'}
                      {isExpanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-4 border-t border-dashed border-slate-200 animate-fadeIn">
                        
                        {/* Interactive Thumbnail strip inside configuration menu */}
                        {productImages.length > 1 && (
                          <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Product Views:</label>
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                              {productImages.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveSlideIndex(prev => ({ ...prev, [product.id]: idx }))}
                                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden flex-shrink-0 bg-white p-0.5 ${idx === currentSlide ? 'border-amber-500' : 'border-slate-200'}`}
                                >
                                  <img src={img} alt="" className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }} />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Select Dimensions:</label>
                          <div className="grid grid-cols-1 gap-1.5">
                            {product.measurements.map((m, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedMeasurements(prev => ({ ...prev, [product.id]: idx }))}
                                className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium border transition-all flex justify-between items-center ${
                                  getMeasurementIndex(product.id) === idx ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{m.label}</span>
                                <span className="text-slate-400">(x{m.priceMultiplier})</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {product.customMeasurement && (
                          <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100/60">
                            <span className="block text-xs font-bold text-amber-800 mb-2">Need custom sizes?</span>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="number"
                                placeholder="Width (ft)"
                                value={customDims[product.id]?.w || ''}
                                onChange={(e) => setCustomDims(prev => ({ ...prev, [product.id]: { ...prev[product.id] || { h: '' }, w: e.target.value } }))}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500"
                              />
                              <input
                                type="number"
                                placeholder="Height (ft)"
                                value={customDims[product.id]?.h || ''}
                                onChange={(e) => setCustomDims(prev => ({ ...prev, [product.id]: { ...prev[product.id] || { w: '' }, h: e.target.value } }))}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                          </div>
                        )}

                        {product.colorOptions && (
                          <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Finish: {activeColorName}</label>
                            <div className="flex flex-wrap gap-1.5">
                              {product.colorOptions.map((c, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: c.name }))}
                                  className={`w-6 h-6 rounded-full border-2 ${activeColorName === c.name ? 'border-amber-500 scale-110' : 'border-transparent'}`}
                                  style={{ backgroundColor: c.hex }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200">
                        <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] ?? 1) - 1) }))} className="px-3 py-2 font-bold">-</button>
                        <span className="w-8 text-center text-sm font-bold text-slate-800">{currentQty}</span>
                        <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] ?? 1) + 1 }))} className="px-3 py-2 font-bold">+</button>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={`flex-grow flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-md ${
                          added[product.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 hover:bg-amber-600 text-white'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {added[product.id] ? 'Added!' : 'Add to Estimate'}
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
