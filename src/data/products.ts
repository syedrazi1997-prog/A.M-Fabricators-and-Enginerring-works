export interface MeasurementOption {
  label: string;
  width: number;
  height: number;
  priceMultiplier: number;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  description: string;
  images: string[];
  features: string[];
  measurements: MeasurementOption[];
  customMeasurement: boolean;
  colorOptions?: ColorOption[];
}

const standardColors: ColorOption[] = [
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'Antique Brown', hex: '#4a3c2a' },
  { name: 'Steel Grey', hex: '#5a6268' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Forest Green', hex: '#2d4a3e' },
  { name: 'Maroon', hex: '#6b1d1d' }
];

const gateColors: ColorOption[] = [
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'Antique Bronze', hex: '#665233' },
  { name: 'Steel Grey', hex: '#5a6268' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Mahogany', hex: '#4a2511' },
  { name: 'Golden Brass', hex: '#b39247' }
];

const shedColors: ColorOption[] = [
  { name: 'Galvanized Silver', hex: '#cccccc' },
  { name: 'Forest Green', hex: '#2d4a3e' },
  { name: 'Brick Red', hex: '#a63a2b' },
  { name: 'Sky Blue', hex: '#4682b4' },
  { name: 'Charcoal', hex: '#333333' },
  { name: 'Ivory White', hex: '#f5f5f0' }
];

const indoorColors: ColorOption[] = [
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Steel Grey', hex: '#5a6268' },
  { name: 'Antique Brass', hex: '#b39247' },
  { name: 'Walnut Brown', hex: '#5c4033' },
  { name: 'Sage Green', hex: '#87a96b' }
];

export const products: Product[] = [
  {
    id: 'small-flower-pot-stand',
    name: 'Heavy Duty Multi-Tier Plant Stand',
    description: 'Elegant wrought iron flower pot stand with anti-rust coating. Perfect for balconies and indoor gardens.',
    basePrice: 1200,
    category: 'Balcony',
    unit: 'piece',
    images: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      'https://images.pexels.com/photos/793012/pexels-photo-793012.jpeg'
    ],
    customMeasurement: false,
    features: ['Wrought Iron build', 'Weather-resistant paint', 'Holds up to 50kg', 'Sleek traditional curves'],
    measurements: [
      { label: '2-Tier (Standard)', width: 1.5, height: 2, priceMultiplier: 1 },
      { label: '3-Tier (Large)', width: 2, height: 3, priceMultiplier: 1.5 }
    ],
    colorOptions: indoorColors
  },
  {
    id: 'iron-wall-brackets',
    name: 'Decorative Shelf Wall Brackets (Pair)',
    description: 'Heavy duty forged iron brackets for elegant rustic shelving and wall support.',
    basePrice: 450,
    category: 'Accessories',
    unit: 'pair',
    images: [
      'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg'
    ],
    customMeasurement: false,
    features: ['Hand-forged iron', 'Pre-drilled mounting holes', 'Matte black textured finish'],
    measurements: [
      { label: '6 inch × 6 inch', width: 0.5, height: 0.5, priceMultiplier: 1 },
      { label: '8 inch × 8 inch', width: 0.66, height: 0.66, priceMultiplier: 1.3 }
    ],
    colorOptions: indoorColors
  },
  {
    id: 'designer-window-safety-grill',
    name: 'Compact Window Safety Grill',
    description: 'Sturdy MS square bar safety grill for smaller ventilation windows and bathrooms.',
    basePrice: 2200,
    category: 'Grills',
    unit: 'piece',
    images: [
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ],
    customMeasurement: true,
    features: ['12mm solid MS square bars', 'Anti-burglar spacing design', 'Primed for immediate painting'],
    measurements: [
      { label: '2ft × 2ft Standard', width: 2, height: 2, priceMultiplier: 1 },
      { label: '3ft × 2ft Wide', width: 3, height: 2, priceMultiplier: 1.4 }
    ],
    colorOptions: standardColors
  },
  {
    id: 'heavy-duty-main-gate',
    name: 'Heavy Duty Main Gate',
    category: 'Gates',
    basePrice: 18500,
    unit: 'piece',
    description: 'Heavy-duty MS iron main gate with decorative scroll work. Perfect for residential and commercial entrances. Powder-coated finish for long-lasting durability.',
    images: [
      'https://images.pexels.com/photos/13317073/pexels-photo-13317073.jpeg',
      'https://images.pexels.com/photos/15174548/pexels-photo-15174548.jpeg'
    ],
    features: ['Premium MS Iron construction', 'Anti-rust primer coating', 'Heavy duty hinges included', 'Customizable design options'],
    measurements: [
      { label: '8ft × 4ft (Standard)', width: 8, height: 4, priceMultiplier: 1.0 },
      { label: '10ft × 5ft (Large)', width: 10, height: 5, priceMultiplier: 1.4 },
      { label: '12ft × 6ft (Extra Large)', width: 12, height: 6, priceMultiplier: 1.9 },
      { label: '14ft × 6ft (Heavy)', width: 14, height: 6, priceMultiplier: 2.3 }
    ],
    customMeasurement: true,
    colorOptions: gateColors
  },
  {
    id: 'motorized-sliding-gate',
    name: 'Motorized Sliding Gate',
    category: 'Gates',
    basePrice: 32000,
    unit: 'piece',
    description: 'Premium motorized sliding gate with automation system. Ideal for wide entrances, commercial properties and industrial use. Smooth operation with remote control.',
    images: [
      'https://images.pexels.com/photos/15174541/pexels-photo-15174541.jpeg'
    ],
    features: ['Italian automation motor', '2 Remote controls included', 'Safety obstacle sensors', 'Heavy duty track & rollers'],
    measurements: [
      { label: '12ft × 5ft', width: 12, height: 5, priceMultiplier: 1.0 },
      { label: '16ft × 5ft', width: 16, height: 5, priceMultiplier: 1.35 },
      { label: '20ft × 6ft', width: 20, height: 6, priceMultiplier: 1.8 }
    ],
    customMeasurement: true,
    colorOptions: gateColors
  },
  {
    id: 'compound-wall-gate',
    name: 'Compound Wall Gate',
    category: 'Gates',
    basePrice: 9500,
    unit: 'piece',
    description: 'Stylish compound wall side gate with vertical bar design. Perfect for pedestrian entry alongside main gate. Lightweight yet strong construction.',
    images: [
      'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg'
    ],
    features: ['Sleek modern aesthetics', 'Lock box integration ready', 'Quick installation setup', 'Low maintenance structure'],
    measurements: [
      { label: '4ft × 4ft', width: 4, height: 4, priceMultiplier: 1.0 },
      { label: '5ft × 4ft', width: 5, height: 4, priceMultiplier: 1.2 },
      { label: '5ft × 5ft', width: 5, height: 5, priceMultiplier: 1.4 },
      { label: '6ft × 5ft', width: 6, height: 5, priceMultiplier: 1.6 }
    ],
    customMeasurement: true,
    colorOptions: gateColors
  },
  {
    id: 'window-safety-grill',
    name: 'Window Safety Grill',
    category: 'Grills',
    basePrice: 2800,
    unit: 'sq.ft',
    description: 'Decorative yet strong window safety grills. Available in various patterns — square, flower, and diamond designs. Protects your home without blocking ventilation.',
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ],
    features: ['12mm solid MS bright bars', 'Perfect alignment & spacing', 'Anti-rust zinc chromate primer', 'Seamless Argon/MIG welding welds'],
    measurements: [
      { label: '3ft × 3ft (Small)', width: 3, height: 3, priceMultiplier: 1.0 },
      { label: '4ft × 3ft (Standard)', width: 4, height: 3, priceMultiplier: 1.33 },
      { label: '5ft × 4ft (Large)', width: 5, height: 4, priceMultiplier: 2.22 },
      { label: '6ft × 4ft (Extra Large)', width: 6, height: 4, priceMultiplier: 2.66 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'ms-boundary-fence',
    name: 'MS Boundary Fence',
    category: 'Grills',
    basePrice: 650,
    unit: 'per running ft',
    description: 'Strong MS iron boundary fencing for plots, farms, and industrial sites. Vertical pickets welded to horizontal rails, galvanized and powder-coated for outdoor durability.',
    images: [
      'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg'
    ],
    features: ['Anti-climb spear tops available', 'Galvanized iron inside for anti-rust', 'Modular panels for fast assembly', 'Concrete anchoring foundation shoes'],
    measurements: [
      { label: '10 Running ft (4ft tall)', width: 10, height: 4, priceMultiplier: 1.0 },
      { label: '20 Running ft (4ft tall)', width: 20, height: 4, priceMultiplier: 2.0 },
      { label: '50 Running ft (5ft tall)', width: 50, height: 5, priceMultiplier: 5.8 },
      { label: '100 Running ft (6ft tall)', width: 100, height: 6, priceMultiplier: 12.5 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'balcony-railing',
    name: 'Balcony Railing',
    category: 'Railings',
    basePrice: 9500,
    unit: 'per running ft',
    description: 'Elegant MS iron balcony railings combining safety with aesthetics. Suitable for residential balconies, terraces, and staircases. Multiple design options available.',
    images: [
      'https://images.pexels.com/photos/323743/pexels-photo-323743.jpeg'
    ],
    features: ['Complies with safety height rules', 'Ergonomic smooth handrail profile', 'Tempered glass insert options', 'Weatherproof metallic paint finish'],
    measurements: [
      { label: '10 Running ft', width: 10, height: 3.5, priceMultiplier: 1.0 },
      { label: '20 Running ft', width: 20, height: 3.5, priceMultiplier: 2.0 },
      { label: '30 Running ft', width: 30, height: 3.5, priceMultiplier: 3.0 },
      { label: '50 Running ft', width: 50, height: 3.5, priceMultiplier: 5.0 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'staircase-handrail',
    name: 'Staircase Handrail',
    category: 'Railings',
    basePrice: 8500,
    unit: 'per running ft',
    description: 'MS iron staircase handrail with vertical balusters. Provides safe grip along stairs for residential and commercial buildings. Wall-mounted or post-supported options.',
    images: [
      'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg'
    ],
    features: ['Sturdy continuous internal structure', 'Flawless wall flange anchorage', 'Kid-safe narrow bar spacing', 'Premium smooth powder coating'],
    measurements: [
      { label: '10 Running ft', width: 10, height: 3, priceMultiplier: 1.0 },
      { label: '15 Running ft', width: 15, height: 3, priceMultiplier: 1.5 },
      { label: '20 Running ft', width: 20, height: 3, priceMultiplier: 2.0 },
      { label: '30 Running ft', width: 30, height: 3, priceMultiplier: 3.0 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'ms-staircase-railing',
    name: 'MS Staircase with Railing',
    category: 'Staircases',
    basePrice: 45000,
    unit: 'flight',
    description: 'Custom-fabricated MS iron staircase with matching railings. Designed for residential and commercial spaces. Strong, durable construction with anti-slip steps.',
    images: [
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg'
    ],
    features: ['Heavy channel structural main stringer', 'Chequered plate anti-slip step treads', 'Includes full supporting side rails', 'Perfect step riser height design'],
    measurements: [
      { label: '8 Steps (standard floor)', width: 3, height: 8, priceMultiplier: 1.0 },
      { label: '10 Steps', width: 3, height: 10, priceMultiplier: 1.25 },
      { label: '12 Steps', width: 3, height: 12, priceMultiplier: 1.5 },
      { label: '14 Steps', width: 3, height: 14, priceMultiplier: 1.75 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'ms-fixed-ladder',
    name: 'MS Fixed Iron Ladder',
    category: 'Staircases',
    basePrice: 6500,
    unit: 'piece',
    description: 'Fixed MS iron ladder for rooftop access, water tanks, and mezzanine floors. Wall-mounted with anti-slip rungs. Custom heights available.',
    images: [
      'https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg'
    ],
    features: ['Solid square bar safety steps', 'Heavy wall bracket extensions', 'Top safety hand-grab handles', 'Compact space-saving design'],
    measurements: [
      { label: '8ft (Single floor)', width: 1.5, height: 8, priceMultiplier: 1.0 },
      { label: '10ft', width: 1.5, height: 10, priceMultiplier: 1.25 },
      { label: '12ft (Double floor)', width: 1.5, height: 12, priceMultiplier: 1.5 },
      { label: '15ft (Rooftop)', width: 1.5, height: 15, priceMultiplier: 1.85 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  },
  {
    id: 'ms-security-door',
    name: 'MS Security Door',
    category: 'Doors',
    basePrice: 14500,
    unit: 'piece',
    description: 'Heavy-duty MS iron security door for ultimate protection. Thick frame with reinforced locking mechanism. Suitable for main entrance, store rooms, and vaults.',
    images: [
      'https://images.pexels.com/photos/15174548/pexels-photo-15174548.jpeg'
    ],
    features: ['Multi-point safety locking mechanism', 'Heavy duty bullet hinge barrels', 'Wire mesh mosquito net layer', 'Thick gauge frame structure'],
    measurements: [
      { label: '7ft × 3ft (Standard)', width: 3, height: 7, priceMultiplier: 1.0 },
      { label: '7ft × 3.5ft (Wide)', width: 3.5, height: 7, priceMultiplier: 1.15 },
      { label: '8ft × 4ft (Large)', width: 4, height: 8, priceMultiplier: 1.45 }
    ],
    customMeasurement: true,
    colorOptions: gateColors
  },
  {
    id: 'ms-rolling-shutter',
    name: 'MS Rolling Shutter',
    category: 'Doors',
    basePrice: 18500,
    unit: 'piece',
    description: 'High-security MS rolling shutters for shops, garages, and industrial warehouses. Smooth pull-down operation with heavy springs.',
    images: [
      'https://images.pexels.com/photos/16143419/pexels-photo-16143419.jpeg'
    ],
    features: ['Galvanized anti-interlock slats', 'Heavy-duty torsion counter springs', 'Side safety guide channel locks', 'Central pull handle & lock box'],
    measurements: [
      { label: '8ft × 8ft (Standard)', width: 8, height: 8, priceMultiplier: 1.0 },
      { label: '10ft × 10ft (Large)', width: 10, height: 10, priceMultiplier: 1.45 },
      { label: '12ft × 12ft (Commercial)', width: 12, height: 12, priceMultiplier: 2.0 }
    ],
    customMeasurement: true,
    colorOptions: shedColors
  },
  {
    id: 'industrial-shed',
    name: 'Industrial Shed Structure',
    category: 'Sheds & Structures',
    basePrice: 145000,
    unit: 'structure',
    description: 'Pre-engineered MS industrial shed structures with Tata/JSW roofing sheets. Heavy-duty truss design for factories, warehouses, and commercial spaces.',
    images: [
      'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg'
    ],
    features: ['Heavy I-beam column foundation pillars', 'Wind-resistant steel truss frame', 'Genuine Tata/JSW coated sheets', 'Rainwater gutter channels included'],
    measurements: [
      { label: '20ft × 40ft (Small)', width: 20, height: 40, priceMultiplier: 1.0 },
      { label: '30ft × 60ft (Medium)', width: 30, height: 60, priceMultiplier: 2.15 },
      { label: '40ft × 80ft (Large)', width: 40, height: 80, priceMultiplier: 3.8 }
    ],
    customMeasurement: true,
    colorOptions: shedColors
  },
  {
    id: 'car-parking-shed',
    name: 'Car Parking Shed',
    category: 'Sheds & Structures',
    basePrice: 28000,
    unit: 'piece',
    description: 'Premium cantilever or pillar supported car parking sheds. Features polycarbonate or tensile fabric roofs to protect vehicles from sun and rain.',
    images: [
      'https://images.pexels.com/photos/16982937/pexels-photo-16982937.jpeg'
    ],
    features: ['UV-resistant polycarbonate roofing top', 'Sturdy curved pipe truss frame', 'Protects car gloss paint fading', 'Withstands heavy rain & winds'],
    measurements: [
      { label: 'Single Car (10ft × 15ft)', width: 10, height: 15, priceMultiplier: 1.0 },
      { label: 'Double Car (20ft × 15ft)', width: 20, height: 15, priceMultiplier: 1.95 }
    ],
    customMeasurement: true,
    colorOptions: shedColors
  },
  {
    id: 'ms-mezzanine-floor',
    name: 'MS Mezzanine Floor',
    category: 'Sheds & Structures',
    basePrice: 35000,
    unit: 'structure',
    description: 'Heavy duty MS mezzanine flooring structures to create extra storage or office workspace inside factories, warehouses, and retail shops.',
    images: [
      'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg'
    ],
    features: ['Heavy ISMC structural channel pillars', 'Chequered plate grid flooring platforms', 'Designed for high load storage', 'Includes safe perimeter protection rails'],
    measurements: [
      { label: '10ft × 10ft Area', width: 10, height: 10, priceMultiplier: 1.0 },
      { label: '15ft × 15ft Area', width: 15, height: 15, priceMultiplier: 2.15 },
      { label: '20ft × 20ft Area', width: 20, height: 20, priceMultiplier: 3.8 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  }
];

export const categories = ['All', 'Gates', 'Grills', 'Railings', 'Balcony', 'Accessories'];
