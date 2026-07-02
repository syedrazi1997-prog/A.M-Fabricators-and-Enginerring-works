export interface MeasurementOption {
  label: string;
  width: number;
  height: number;
  priceMultiplier: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  description: string;
  image: string[]; // Supports multiple images
  features: string[];
  measurements: MeasurementOption[];
  customMeasurement: boolean;
}

export const products: Product[] = [
  {
    id: 'small-flower-pot-stand',
    name: 'Heavy Duty Multi-Tier Plant Stand',
    description: 'Elegant wrought iron flower pot stand with anti-rust coating. Perfect for balconies and indoor gardens.',
    basePrice: 1200,
    category: 'Balcony',
    image: ['https://images.unsplash.com/photo-1665287729223-b1ddc5b4c0ca?q=80&w=678&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    unit: 'piece',
    measurements: [
      { label: '2-Tier (Standard)', width: 1.5, height: 2, priceMultiplier: 1 },
      { label: '3-Tier (Large)', width: 2, height: 3, priceMultiplier: 1.5 }
    ],
    customMeasurement: false,
    features: ['Wrought Iron build', 'Weather-resistant paint', 'Holds up to 50kg', 'Sleek traditional curves']
  },
  {
    id: 'iron-wall-brackets',
    name: 'Decorative Shelf Wall Brackets (Pair)',
    description: 'Heavy duty forged iron brackets for elegant rustic shelving and wall support.',
    basePrice: 450,
    category: 'Accessories',
    image: ['https://rukminim2.flixcart.com/image/480/640/k4bms280/rack-shelf/z/z/x/wooden-and-iron-floating-wall-shelf-with-3-shelves-brown-original-imafn759gkzemkwp.jpeg?q=90'],
    unit: 'pair',
    measurements: [
      { label: '6 inch × 6 inch', width: 0.5, height: 0.5, priceMultiplier: 1 },
      { label: '8 inch × 8 inch', width: 0.66, height: 0.66, priceMultiplier: 1.3 }
    ],
    customMeasurement: false,
    features: ['Hand-forged iron', 'Pre-drilled mounting holes', 'Matte black textured finish']
  },
  {
    id: 'designer-window-safety-grill',
    name: 'Compact Window Safety Grill',
    description: 'Sturdy MS square bar safety grill for smaller ventilation windows and bathrooms.',
    basePrice: 2200,
    category: 'Grills',
    image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfS-0jThsNvXvP8tkIPgsr5AO8aJ9RiLSQKeNO59f3ig&s=10'],
    unit: 'piece',
    measurements: [{ label: '2ft × 2ft Standard', width: 2, height: 2, priceMultiplier: 1 }],
    customMeasurement: false,
    features: ['Premium MS Square Bar fabrication', 'Anti-corrosive primer base', 'Modern parallel bar design']
  },
  {
    id: 'main-gate-1',
    name: 'Heavy Duty Main Gate',
    category: 'Gates',
    basePrice: 18500,
    unit: 'piece',
    description: 'Heavy-duty MS iron main gate with decorative scroll work. Perfect for residential and commercial entrances. Powder-coated finish for long-lasting durability.',
    image: ['https://images.pexels.com/photos/18143352/pexels-photo-18143352.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['MS Iron frame', 'Powder coated finish', 'Anti-rust treatment', 'Heavy-duty hinges', 'Built-in lock provision'],
    measurements: [
      { label: '8ft × 4ft (Standard)', width: 8, height: 4, priceMultiplier: 1.0 },
      { label: '10ft × 5ft (Large)', width: 10, height: 5, priceMultiplier: 1.35 },
      { label: '12ft × 6ft (Extra Large)', width: 12, height: 6, priceMultiplier: 1.75 },
      { label: '14ft × 6ft (Heavy)', width: 14, height: 6, priceMultiplier: 2.1 }
    ],
    customMeasurement: true
  },
  {
    id: 'sliding-gate-1',
    name: 'Motorized Sliding Gate',
    category: 'Gates',
    basePrice: 32000,
    unit: 'piece',
    description: 'Premium motorized sliding gate with automation system. Ideal for wide entrances, commercial properties and industrial use. Smooth operation with remote control.',
    image: ['https://images.pexels.com/photos/4671451/pexels-photo-4671451.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['Automatic motorized', 'Remote control included', 'Safety sensors', 'Manual override', 'Heavy MS channel track'],
    measurements: [
      { label: '12ft × 5ft', width: 12, height: 5, priceMultiplier: 1.0 },
      { label: '16ft × 5ft', width: 16, height: 5, priceMultiplier: 1.3 },
      { label: '20ft × 6ft', width: 20, height: 6, priceMultiplier: 1.65 }
    ],
    customMeasurement: true
  },
  {
    id: 'window-grill-1',
    name: 'Window Safety Grill',
    category: 'Grills',
    basePrice: 2800,
    unit: 'sq.ft',
    description: 'Decorative yet strong window safety grills. Available in various patterns — square, flower, and diamond designs. Protects your home without blocking ventilation.',
    image: ['https://images.pexels.com/photos/8333069/pexels-photo-8333069.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['16mm MS square bars', 'Decorative patterns', 'Epoxy primer + enamel paint', 'Welded joints', 'Corrosion resistant'],
    measurements: [
      { label: '3ft × 3ft (Small)', width: 3, height: 3, priceMultiplier: 1.0 },
      { label: '4ft × 3ft (Standard)', width: 4, height: 3, priceMultiplier: 1.33 },
      { label: '5ft × 4ft (Large)', width: 5, height: 4, priceMultiplier: 2.22 },
      { label: '6ft × 4ft (Extra Large)', width: 6, height: 4, priceMultiplier: 2.67 }
    ],
    customMeasurement: true
  },
  {
    id: 'balcony-railing-1',
    name: 'Balcony Railing',
    category: 'Railings',
    basePrice: 950,
    unit: 'per running ft',
    description: 'Elegant MS iron balcony railings combining safety with aesthetics. Suitable for residential balconies, terraces, and staircases. Multiple design options available.',
    image: ['https://images.pexels.com/photos/11740803/pexels-photo-11740803.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['40mm × 40mm MS hollow section', 'Height 900mm (standard)', 'Decorative balusters', 'Rust-proof coating', 'Smooth welded finish'],
    measurements: [
      { label: '10 Running ft', width: 10, height: 3, priceMultiplier: 10 },
      { label: '20 Running ft', width: 20, height: 3, priceMultiplier: 20 },
      { label: '30 Running ft', width: 30, height: 3, priceMultiplier: 30 },
      { label: '50 Running ft', width: 50, height: 3, priceMultiplier: 50 }
    ],
    customMeasurement: true
  },
  {
    id: 'staircase-1',
    name: 'MS Staircase with Railing',
    category: 'Staircases',
    basePrice: 45000,
    unit: 'flight',
    description: 'Custom-fabricated MS iron staircase with matching railings. Designed for residential and commercial spaces. Strong, durable construction with anti-slip steps.',
    image: ['https://images.pexels.com/photos/15501345/pexels-photo-15501345.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['MS hollow section frame', 'Chequered plate steps', 'Integrated railing system', 'Customizable steps count', 'Heavy-duty anchoring'],
    measurements: [
      { label: '8 Steps (standard floor)', width: 4, height: 8, priceMultiplier: 1.0 },
      { label: '10 Steps', width: 4, height: 10, priceMultiplier: 1.25 },
      { label: '12 Steps', width: 4, height: 12, priceMultiplier: 1.5 },
      { label: '14 Steps', width: 5, height: 14, priceMultiplier: 1.9 }
    ],
    customMeasurement: true
  },
  {
    id: 'security-door-1',
    name: 'MS Security Door',
    category: 'Doors',
    basePrice: 12500,
    unit: 'piece',
    description: 'Heavy-duty MS iron security door for ultimate protection. Thick frame with reinforced locking mechanism. Suitable for main entrance, store rooms, and vaults.',
    image: ['https://images.pexels.com/photos/11681678/pexels-photo-11681678.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['2.5mm MS sheet', '50mm × 50mm frame', 'Triple point locking', 'Anti-drill hinges', '2-coat paint finish'],
    measurements: [
      { label: '7ft × 3ft (Standard)', width: 3, height: 7, priceMultiplier: 1.0 },
      { label: '7ft × 3.5ft (Wide)', width: 3.5, height: 7, priceMultiplier: 1.17 },
      { label: '8ft × 4ft (Large)', width: 4, height: 8, priceMultiplier: 1.52 }
    ],
    customMeasurement: true
  },
  {
    id: 'shed-structure-1',
    name: 'Industrial Shed Structure',
    category: 'Sheds & Structures',
    basePrice: 85000,
    unit: 'unit',
    description: 'Prefabricated MS iron industrial shed structure. Ideal for factories, warehouses, parking sheds, and agricultural use. Fast installation with pre-drilled sections.',
    image: ['https://images.pexels.com/photos/10533362/pexels-photo-10533362.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['MS angle + channel frame', 'Corrugated sheet roofing', 'Customizable span', 'Corrosion-resistant bolts', 'Wind-load engineered'],
    measurements: [
      { label: '20ft × 20ft', width: 20, height: 20, priceMultiplier: 1.0 },
      { label: '30ft × 20ft', width: 30, height: 20, priceMultiplier: 1.5 },
      { label: '40ft × 30ft', width: 40, height: 30, priceMultiplier: 2.4 },
      { label: '50ft × 40ft', width: 50, height: 40, priceMultiplier: 4.0 }
    ],
    customMeasurement: true
  },
  {
    id: 'compound-wall-gate-1',
    name: 'Compound Wall Gate',
    category: 'Gates',
    basePrice: 9500,
    unit: 'piece',
    description: 'Stylish compound wall side gate with vertical bar design. Perfect for pedestrian entry alongside main gate. Lightweight yet strong construction.',
    image: ['https://images.pexels.com/photos/6341301/pexels-photo-6341301.jpeg?auto=compress&cs=tinysrgb&w=800'], // Fixed to string[]
    features: ['25mm MS square pipe frame', 'Vertical bar design', 'Latch + padlock provision', 'Hinged or sliding', 'Weather-resistant paint'],
    measurements: [
      { label: '4ft × 4ft', width: 4, height: 4, priceMultiplier: 1.0 },
      { label: '5ft × 4ft', width: 5, height: 4, priceMultiplier: 1.25 },
      { label: '5ft × 5ft', width: 5, height: 5, priceMultiplier: 1.56 },
      { label: '6ft × 5ft', width: 6, height: 5, priceMultiplier: 1.88 }
    ],
    customMeasurement: true
  }
]; // The array properly closes here at the end

export const categories = ['All', 'Gates', 'Grills', 'Railings', 'Balcony', 'Accessories'];
