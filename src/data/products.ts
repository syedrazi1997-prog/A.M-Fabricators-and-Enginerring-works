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
  { name: 'White', hex: '#ffffff' }
];

const gateColors: ColorOption[] = [
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'Antique Bronze', hex: '#665233' },
  { name: 'Steel Grey', hex: '#5a6268' },
  { name: 'Mahogany', hex: '#4a2511' }
];

const shedColors: ColorOption[] = [
  { name: 'Galvanized Silver', hex: '#cccccc' },
  { name: 'Forest Green', hex: '#2d4a3e' },
  { name: 'Charcoal', hex: '#333333' }
];

const indoorColors: ColorOption[] = [
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Antique Brass', hex: '#b39247' }
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
      'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg',
      'https://images.pexels.com/photos/4505169/pexels-photo-4505169.jpeg'
    ],
    customMeasurement: false,
    features: ['Wrought Iron build', 'Weather-resistant paint', 'Holds up to 50kg'],
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
      'https://images.pexels.com/photos/4622410/pexels-photo-4622410.jpeg'
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
      'https://images.pexels.com/photos/931062/pexels-photo-931062.jpeg'
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
    description: 'Heavy-duty MS iron main gate with decorative scroll work. Perfect for residential and commercial entrances.',
    images: [
      'https://images.pexels.com/photos/10346231/pexels-photo-10346231.jpeg',
      'https://images.pexels.com/photos/14981143/pexels-photo-14981143.jpeg'
    ],
    features: ['Premium MS Iron construction', 'Anti-rust primer coating', 'Heavy duty hinges included'],
    measurements: [
      { label: '8ft × 4ft (Standard)', width: 8, height: 4, priceMultiplier: 1.0 },
      { label: '10ft × 5ft (Large)', width: 10, height: 5, priceMultiplier: 1.4 }
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
    description: 'Premium motorized sliding gate with automation system. Smooth operation with remote control.',
    images: [
      'https://images.pexels.com/photos/11883505/pexels-photo-11883505.jpeg'
    ],
    features: ['Italian automation motor', '2 Remote controls included', 'Heavy duty track & rollers'],
    measurements: [
      { label: '12ft × 5ft', width: 12, height: 5, priceMultiplier: 1.0 },
      { label: '16ft × 5ft', width: 16, height: 5, priceMultiplier: 1.35 }
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
    description: 'Stylish compound wall side gate with vertical bar design. Perfect for pedestrian entry.',
    images: [
      'https://images.pexels.com/photos/14847761/pexels-photo-14847761.jpeg'
    ],
    features: ['Sleek modern aesthetics', 'Lock box integration ready', 'Quick installation setup'],
    measurements: [
      { label: '4ft × 4ft', width: 4, height: 4, priceMultiplier: 1.0 },
      { label: '5ft × 4ft', width: 5, height: 4, priceMultiplier: 1.2 }
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
    description: 'Decorative yet strong window safety grills. Available in various iron layout patterns.',
    images: [
      'https://images.pexels.com/photos/12316434/pexels-photo-12316434.jpeg'
    ],
    features: ['12mm solid MS bright bars', 'Anti-rust zinc chromate primer', 'Seamless Argon/MIG welds'],
    measurements: [
      { label: '3ft × 3ft (Small)', width: 3, height: 3, priceMultiplier: 1.0 },
      { label: '4ft × 3ft (Standard)', width: 4, height: 3, priceMultiplier: 1.33 }
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
    description: 'Strong MS iron boundary fencing for plots, residential perimeters, and secure locations.',
    images: [
      'https://images.pexels.com/photos/973506/pexels-photo-973506.jpeg'
    ],
    features: ['Anti-climb spear tops available', 'Galvanized iron core', 'Modular panels for fast assembly'],
    measurements: [
      { label: '10 Running ft (4ft tall)', width: 10, height: 4, priceMultiplier: 1.0 },
      { label: '20 Running ft (4ft tall)', width: 20, height: 4, priceMultiplier: 2.0 }
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
    description: 'Elegant MS iron balcony railings combining modern safety structural codes with premium aesthetics.',
    images: [
      'https://images.pexels.com/photos/3639540/pexels-photo-3639540.jpeg'
    ],
    features: ['Complies with safety height rules', 'Ergonomic smooth handrail profile', 'Weatherproof metallic paint'],
    measurements: [
      { label: '10 Running ft', width: 10, height: 3.5, priceMultiplier: 1.0 },
      { label: '20 Running ft', width: 20, height: 3.5, priceMultiplier: 2.0 }
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
    description: 'MS iron staircase handrail with vertical balusters. Provides safe grip along internal stairs.',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    ],
    features: ['Sturdy continuous internal structure', 'Flawless wall flange anchorage', 'Kid-safe narrow bar spacing'],
    measurements: [
      { label: '10 Running ft', width: 10, height: 3, priceMultiplier: 1.0 },
      { label: '15 Running ft', width: 15, height: 3, priceMultiplier: 1.5 }
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
    description: 'Custom-fabricated structural MS iron stairwell systems featuring heavy-duty safety railings.',
    images: [
      'https://images.pexels.com/photos/221502/pexels-photo-221502.jpeg'
    ],
    features: ['Heavy channel structural main stringer', 'Chequered plate anti-slip step treads'],
    measurements: [
      { label: '8 Steps (standard floor)', width: 3, height: 8, priceMultiplier: 1.0 },
      { label: '10 Steps', width: 3, height: 10, priceMultiplier: 1.25 }
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
    description: 'Fixed MS iron ladder for rooftop access, water tanks, and structural maintenance access.',
    images: [
      'https://images.pexels.com/photos/5414841/pexels-photo-5414841.jpeg'
    ],
    features: ['Solid square bar safety steps', 'Heavy wall bracket extensions', 'Top safety hand-grab handles'],
    measurements: [
      { label: '8ft (Single floor)', width: 1.5, height: 8, priceMultiplier: 1.0 },
      { label: '10ft', width: 1.5, height: 10, priceMultiplier: 1.25 }
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
    description: 'Heavy-duty MS iron security door for ultimate entrance protection. Reinforced locking mechanism.',
    images: [
      'https://images.pexels.com/photos/279648/pexels-photo-279648.jpeg'
    ],
    features: ['Multi-point safety locking mechanism', 'Heavy duty bullet hinge barrels', 'Wire mesh mosquito net layer'],
    measurements: [
      { label: '7ft × 3ft (Standard)', width: 3, height: 7, priceMultiplier: 1.0 },
      { label: '7ft × 3.5ft (Wide)', width: 3.5, height: 7, priceMultiplier: 1.15 }
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
    description: 'High-security MS rolling shutters for storefront commercial lockup facilities and industrial warehouses.',
    images: [
      'https://images.pexels.com/photos/102128/pexels-photo-102128.jpeg'
    ],
    features: ['Galvanized anti-interlock slats', 'Heavy-duty torsion counter springs', 'Central pull handle & lock box'],
    measurements: [
      { label: '8ft × 8ft (Standard)', width: 8, height: 8, priceMultiplier: 1.0 },
      { label: '10ft × 10ft (Large)', width: 10, height: 10, priceMultiplier: 1.45 }
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
    description: 'Pre-engineered industrial fabrication structural sheds built with premium heavy-duty steel truss frames.',
    images: [
      'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg'
    ],
    features: ['Heavy I-beam column foundation pillars', 'Wind-resistant steel truss frame', 'Genuine coated corrugated sheets'],
    measurements: [
      { label: '20ft × 40ft (Small)', width: 20, height: 40, priceMultiplier: 1.0 },
      { label: '30ft × 60ft (Medium)', width: 30, height: 60, priceMultiplier: 2.15 }
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
    description: 'Premium cantilever or pillar supported structures featuring weather-shielding outdoor roofing.',
    images: [
      'https://images.pexels.com/photos/8134833/pexels-photo-8134833.jpeg'
    ],
    features: ['UV-resistant roofing shield top', 'Sturdy curved pipe truss frame', 'Protects car paint from fading'],
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
    description: 'Heavy duty MS mezzanine elevated flooring platforms designed to double storage and industrial production workspace.',
    images: [
      'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg'
    ],
    features: ['Heavy ISMC structural channel pillars', 'Chequered plate grid flooring platforms', 'Designed for high load storage'],
    measurements: [
      { label: '10ft × 10ft Area', width: 10, height: 10, priceMultiplier: 1.0 },
      { label: '15ft × 15ft Area', width: 15, height: 15, priceMultiplier: 2.15 }
    ],
    customMeasurement: true,
    colorOptions: standardColors
  }
];

export const categories = ['All', 'Gates', 'Grills', 'Railings', 'Balcony', 'Accessories'];
