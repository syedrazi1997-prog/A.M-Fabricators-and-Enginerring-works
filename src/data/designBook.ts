export interface DesignPattern {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { name: 'Matte Black', hex: '#1A1A1A' },
  { name: 'Antique Gold', hex: '#D4AF37' },
  { name: 'Dark Bronze', hex: '#4A3B32' },
  { name: 'Silver Grey', hex: '#8E9294' },
  { name: 'Glossy White', hex: '#F5F5F5' }
];

export const DESIGN_PATTERNS: Record<string, DesignPattern[]> = {
  gates: [
    { id: 'g-classic', name: 'Classic Roman Scrollwork', image: 'https://images.pexels.com/photos/18022569/pexels-photo-18022569.jpeg', description: 'Traditional ornate curves with pointed spears.' },
    { id: 'g-modern', name: 'Modern Minimalist Horizontal', image: 'https://images.pexels.com/photos/10134005/pexels-photo-10134005.jpeg', description: 'Clean, sleek horizontal MS slats for modern homes.' },
    { id: 'g-laser', name: 'Geometric Laser-Cut', image: 'https://images.pexels.com/photos/11239824/pexels-photo-11239824.jpeg', description: 'Precision CNC laser-cut sheets with luxury patterns.' }
  ],
  grills: [
    { id: 'gr-diamond', name: 'Safety Diamond Cross', description: 'Heavy-duty diamond pattern for maximum security.' },
    { id: 'gr-floral', name: 'Vintage Floral Ornate', description: 'Decorative iron flowers embedded into square bars.' }
  ]
};
